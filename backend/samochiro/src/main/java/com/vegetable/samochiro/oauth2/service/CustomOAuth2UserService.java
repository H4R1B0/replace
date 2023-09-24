package com.vegetable.samochiro.oauth2.service;

import com.vegetable.samochiro.domain.Room;
import com.vegetable.samochiro.domain.User;
import com.vegetable.samochiro.oauth2.dto.OAuthAttributes;
import com.vegetable.samochiro.repository.RoomRepository;
import com.vegetable.samochiro.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserRepository userRepository;
    private final RoomRepository roomRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

        User user = saveOrUpdate(attributes);

        return new DefaultOAuth2User(
            Collections.singleton(new SimpleGrantedAuthority(user.getRoleKey())),
            attributes.getAttributes(),
            attributes.getNameAttributeKey()
        );
    }

    private User saveOrUpdate(OAuthAttributes attributes) {
        //사용자 가져오기
        Optional<User> findUser = userRepository.findById(attributes.getId());

        //사용자가 없는 경우
        if (findUser.isEmpty()) {
            User user = attributes.toEntity();
            userRepository.save(user);
            //방 생성
            for (int i = 1; i <= 3; i++) {
                Room room = generateRoom(i, user);
                roomRepository.save(room);
                user.getRooms().add(room);
            }
            return user;
        }

        //사용자가 있는 경우
        findUser.map(entity -> entity.update(attributes.getEmail()));

        return userRepository.save(findUser.get());
    }

    private Room generateRoom(int num, User user) {
        String roomUuid = UUID.randomUUID().toString();
        return Room.builder()
            .uuid(roomUuid)
            .sequence(num)
            .targetName(null)
            .user(user)
            .build();
    }
}
package com.vegetable.samochiro.service;

import com.vegetable.samochiro.domain.Room;
import com.vegetable.samochiro.domain.User;
import com.vegetable.samochiro.dto.user.HouseSearchResponse;
import com.vegetable.samochiro.dto.user.HouseSearchRoomResponse;
import com.vegetable.samochiro.dto.user.IsChangeNicknameResponse;
import com.vegetable.samochiro.dto.user.NicknameSearchResponse;
import com.vegetable.samochiro.dto.user.SecessionResponse;
import com.vegetable.samochiro.dto.user.NicknameUpdateRequest;
import com.vegetable.samochiro.oauth2.token.JwtToken;
import com.vegetable.samochiro.oauth2.token.JwtTokenProvider;
import com.vegetable.samochiro.repository.UserRepository;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	private final JwtTokenProvider tokenProvider;

	@Transactional
	public String updateNickname(NicknameUpdateRequest updateRequest, String userId) {
		Optional<User> findUser = userRepository.findById(userId);
		findUser.get().setNickname(updateRequest.getNickname());
		findUser.get().setChange(true);
		userRepository.save(findUser.get());
		//update

        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_USER");
        org.springframework.security.core.userdetails.User userDetails = new org.springframework.security.core.userdetails.User(userId, "", Collections.singleton(authority));

        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());

        JwtToken jwtToken = tokenProvider.generateNewToken(authentication);
		//jwt 토큰 생성

		return jwtToken.getAccessToken();
	}
	//닉네임 설정 - 유저 5번

	public boolean findDuplicateNickname(String nickname) {
		Optional<User> findUser = userRepository.findByNickname(nickname);
		if(findUser.isPresent()) {
			return true; //중복
		}
		else {
			return false; //중복 x
		}
	}
	//닉네임 중복 검사 - 유저 6번

	public NicknameSearchResponse findUserByNickname(String nickname) {
		Optional<User> findUser = userRepository.findByNickname(nickname);

		if(findUser.isPresent()) {
			NicknameSearchResponse response = new NicknameSearchResponse(findUser.get().getNickname());
			return response;
		}
		else {
			NicknameSearchResponse response = new NicknameSearchResponse();
			return response;
		}
	}
	//닉네임 검색 - 유저 7번

	public HouseSearchResponse findHouseByUserId(String userId) {
		Optional<User> findUser = userRepository.findById(userId);
		//userId로 유저를 꺼내와서 해당 유저의 닉네임, 방들 조회

		List<Room> rooms = findUser.get().getRooms();
		List<HouseSearchRoomResponse> roomDtoList = new ArrayList<>();

		for(Room r : rooms) {
			HouseSearchRoomResponse roomResponse = new HouseSearchRoomResponse();
			roomResponse.setTargetName(r.getTargetName());
			roomResponse.setSequence(r.getSequence());
			roomDtoList.add(roomResponse);
		}

		HouseSearchResponse response = new HouseSearchResponse(roomDtoList);
		return response;
	}
	//집 조회 - 집 1번

	@Transactional
	public SecessionResponse secession(String userId) {
		userRepository.deleteById(userId);
		return SecessionResponse.builder().message("회원 탈퇴에 성공하였습니다.").build();
	}
	//회원 탈퇴 - 유저 8

    public IsChangeNicknameResponse isChangeNickname(String userId) {
        boolean isChangeNickname = userRepository.findById(userId).get().isChange();
        if (!isChangeNickname) {
            return IsChangeNicknameResponse.builder().isChange(false).message("닉네임 변경이 가능합니다.").build();
        }
        return IsChangeNicknameResponse.builder().isChange(true).message("닉네임 변경이 불가합니다.").build();
    }
    //닉네임 변경 여부 조회 - 유저 9

}

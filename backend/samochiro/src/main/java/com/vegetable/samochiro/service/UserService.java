package com.vegetable.samochiro.service;

import com.vegetable.samochiro.domain.Room;
import com.vegetable.samochiro.domain.User;
import com.vegetable.samochiro.dto.user.HouseSearchResponse;
import com.vegetable.samochiro.dto.user.HouseSearchRoomResponse;
import com.vegetable.samochiro.dto.user.IsChangeNicknameResponse;
import com.vegetable.samochiro.dto.user.NicknameSearchResponse;
import com.vegetable.samochiro.dto.user.SecessionResponse;
import com.vegetable.samochiro.dto.user.UserInfoRequest;
import com.vegetable.samochiro.dto.user.NicknameUpdateRequest;
import com.vegetable.samochiro.dto.user.UsernameAuthenticationToken;
import com.vegetable.samochiro.oauth2.token.JwtTokenProvider;
import com.vegetable.samochiro.repository.RefreshTokenRepository;
import com.vegetable.samochiro.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	private final AuthenticationManagerBuilder authenticationManagerBuilder;
	private final JwtTokenProvider tokenProvider;
	private final RefreshTokenRepository refreshTokenRepository;

	@Transactional
	public String updateNickname(NicknameUpdateRequest updateRequest) {
		Optional<User> findUser = userRepository.findById(updateRequest.getUserId());
		findUser.get().setNickname(updateRequest.getNickname());
		findUser.get().setChange(true);
		userRepository.save(findUser.get());
		//update

		UserInfoRequest request = new UserInfoRequest(updateRequest.getUserId());
		UsernameAuthenticationToken authenticationToken = request.toAuthentication();
		Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

		Claims claims = Jwts.claims();
		claims.put("userId", updateRequest.getUserId());
		claims.put("nickname", updateRequest.getNickname());
		//jwt 토큰에 id, 닉네임 넣기

//		JwtToken token = tokenProvider.generateToken(authentication);
		String token = tokenProvider.generateToken(authentication);
		//jwt 토큰 생성

//		refreshTokenRepository.save(token);
		//jwt 토큰 redis에 저장

		return token;
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
			NicknameSearchResponse response = new NicknameSearchResponse(findUser.get().getId(), findUser.get().getNickname());
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
			roomResponse.setRoomUuid(r.getUuid());
			roomResponse.setTargetName(r.getTargetName());
			roomResponse.setSequence(r.getSequence());
			roomDtoList.add(roomResponse);
		}

		HouseSearchResponse response = new HouseSearchResponse(findUser.get().getNickname(), roomDtoList);
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

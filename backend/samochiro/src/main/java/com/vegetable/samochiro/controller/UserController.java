package com.vegetable.samochiro.controller;

import com.vegetable.samochiro.dto.common.MessageResponse;
import com.vegetable.samochiro.dto.user.HouseSearchResponse;
import com.vegetable.samochiro.dto.user.IsChangeNicknameResponse;
import com.vegetable.samochiro.dto.user.NicknameDuplicateRequest;
import com.vegetable.samochiro.dto.user.NicknameSearchResponse;
import com.vegetable.samochiro.dto.user.NicknameUpdateRequest;
import com.vegetable.samochiro.dto.user.NicknameUpdateResponse;
import com.vegetable.samochiro.oauth2.token.JwtTokenService;
import com.vegetable.samochiro.service.UserService;
import com.vegetable.samochiro.util.HeaderUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

	private final UserService userService;
	private final JwtTokenService jwtTokenService;
    private final HeaderUtils headerUtils;

	@PutMapping
	public ResponseEntity<NicknameUpdateResponse> setNewNickname(@RequestBody NicknameUpdateRequest updateRequest, @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
		String userId = headerUtils.getUserId(authorizationHeader);

		String accessToken = authorizationHeader.substring(7);
		String token = userService.updateNickname(updateRequest, userId);
		jwtTokenService.deleteJwtToken(accessToken);
		jwtTokenService.saveJwtToken(token, userId);

		String message = "닉네임 설정이 완료되었습니다.";

		return ResponseEntity.ok(new NicknameUpdateResponse(token, message));
	}
	//닉네임 설정 - 유저 5번

	@PostMapping("/duplicate")
	public ResponseEntity<Boolean> checkDuplicateNickname(@RequestBody NicknameDuplicateRequest request) {
		boolean isDuplicate = userService.findDuplicateNickname(request.getNickname());
		return ResponseEntity.status(HttpStatus.OK).body(isDuplicate);
	}
	//닉네임 중복 검사 - 유저 6번

	@GetMapping
	public ResponseEntity<NicknameSearchResponse> searchUserByNickname(@RequestParam String nickname) {
		NicknameSearchResponse findUser = userService.findUserByNickname(nickname);
		return ResponseEntity.status(HttpStatus.OK).body(findUser);
	}
	//닉네임 검색 - 유저 7번

	@GetMapping("/home")
	public ResponseEntity<HouseSearchResponse> searchHouseByUserId(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
		String userId = headerUtils.getUserId(authorizationHeader);

		HouseSearchResponse house = userService.findHouseByUserId(userId);
		return ResponseEntity.ok(house);
	}
	//집 조회 - 집 1번

	@GetMapping("/home/{nickname}")
	public ResponseEntity<HouseSearchResponse> searchHouseByNickname(@PathVariable String nickname) {
		HouseSearchResponse house = userService.findHouseByNickname(nickname);
		return ResponseEntity.status(HttpStatus.OK).body(house);
	}
	//남 집 조회 - 집 2번

	@GetMapping("/isChange")
	public ResponseEntity<IsChangeNicknameResponse> isChangeNickname(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
		String userId = headerUtils.getUserId(authorizationHeader);
		IsChangeNicknameResponse response = userService.isChangeNickname(userId);
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
	//닉네임 변경 여부 조회 - 유저 9

	@DeleteMapping
	public ResponseEntity<String> logout(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
		String accessToken = authorizationHeader.substring(7);
		userService.logout(accessToken);
		return ResponseEntity.status(HttpStatus.OK).body("정상적으로 로그아웃되었습니다.");
	}
	//로그아웃 - 유저 4

	@DeleteMapping("/me")
	public ResponseEntity<MessageResponse> withdrawal(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
		String userId = headerUtils.getUserId(authorizationHeader);
		userService.withdrawal(userId);
		return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("회원 탈퇴에 성공하였습니다."));
    }
    //회원 탈퇴 - 유저 8

}

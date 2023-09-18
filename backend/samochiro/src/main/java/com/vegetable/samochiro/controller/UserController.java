package com.vegetable.samochiro.controller;

import com.vegetable.samochiro.dto.user.HouseSearchResponse;
import com.vegetable.samochiro.dto.user.NicknameSearchResponse;
import com.vegetable.samochiro.dto.user.NicknameUpdateRequest;
import com.vegetable.samochiro.dto.user.NicknameUpdateResponse;
import com.vegetable.samochiro.oauth2.token.JwtToken;
import com.vegetable.samochiro.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

	private final UserService userService;

	@PutMapping
	public ResponseEntity<NicknameUpdateResponse> setNewNickname(@RequestBody NicknameUpdateRequest updateRequest) {
		try {
			String token = userService.updateNickname(updateRequest);
			String message = "닉네임 설정이 완료되었습니다.";

			return ResponseEntity.ok(new NicknameUpdateResponse(token, message));
		}
		catch (Exception e) {
			e.printStackTrace();
			String message = "잘못된 요청입니다.";
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new NicknameUpdateResponse(null, message));
		}
	}
	//닉네임 설정 - 유저 5번

	@PostMapping("/duplicate")
	public ResponseEntity<String> checkDuplicateNickname(@RequestBody String nickname) {
		boolean isDuplicate = userService.findDuplicateNickname(nickname);

		try {
			String message;
			if(isDuplicate) {
				message = "중복 된 닉네임입니다.";
			}
			else {
				message = "사용 가능한 닉네임입니다.";
			}
			return ResponseEntity.ok(message);
		}
		catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 요청입니다.");
		}
	}
	//닉네임 중복 검사 - 유저 6번

	@GetMapping
	public ResponseEntity<NicknameSearchResponse> searchUserByNickname(@RequestParam String nickname) {
		try {
			NicknameSearchResponse findUser = userService.findUserByNickname(nickname);
			//결과가 없는 경우 NicknameSearchResponse가 null인지 테스트해보기
			return ResponseEntity.ok(findUser);
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().build();
		}
	}
	//닉네임 검색 - 유저 7번

	@PostMapping
	public ResponseEntity<HouseSearchResponse> searchHouseByUserId(@RequestBody String userId) {
		try {
			HouseSearchResponse house = userService.findHouseByUserId(userId);
			return ResponseEntity.ok(house);
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().build();
		}
	}
	//집 조회 - 집 1번



}

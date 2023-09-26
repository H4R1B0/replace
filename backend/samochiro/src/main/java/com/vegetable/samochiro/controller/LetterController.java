package com.vegetable.samochiro.controller;

import com.vegetable.samochiro.dto.common.MessageResponse;
import com.vegetable.samochiro.dto.letter.LetterDetailResponse;
import com.vegetable.samochiro.dto.letter.LetterListResponse;
import com.vegetable.samochiro.dto.letter.LetterSaveRequest;
import com.vegetable.samochiro.service.LetterService;
import java.util.List;

import com.vegetable.samochiro.util.HeaderUtils;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/letter")
public class LetterController {

	private final LetterService letterService;
	private final HeaderUtils headerUtils;

	@PostMapping
	public ResponseEntity<MessageResponse> saveNewLetter(@RequestBody LetterSaveRequest saveRequest, @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
		try {
			String userId = headerUtils.getUserId(authorizationHeader);
			letterService.saveLetter(saveRequest, userId);
			return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("편지가 등록되었습니다."));
		}
		catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("잘못된 요청입니다."));
		}
	}
	//편지 등록 - 서재 1번

	@GetMapping("/{sequence}")
	public ResponseEntity<Response> getLetterList(@PathVariable int sequence, @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
		try {
			String userId = headerUtils.getUserId(authorizationHeader);
			List<LetterListResponse> letterList = letterService.findLetterList(userId, sequence);
			return ResponseEntity.ok(new Response(letterList));
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body(new Response("잘못된 요청입니다."));
		}
	}
	//방 별 편지 리스트 조회 - 서재 2번

	@GetMapping("/detail/{letterId}")
	public ResponseEntity<LetterDetailResponse> getLetterDetail(@PathVariable Long letterId) {
		try {
			LetterDetailResponse letterDetail = letterService.findLetterDetail(letterId);
			return ResponseEntity.ok(letterDetail);
		}
		catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().build();
		}
	}
	//편지 상세 조회 - 서재 3번

	@DeleteMapping("/{letterId}")
	public ResponseEntity<MessageResponse> deleteLetter(@PathVariable Long letterId) {
		try {
			letterService.deleteLetter(letterId);
			return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("삭제되었습니다."));
		}
		catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("잘못된 요청입니다."));
		}
	}

	@Data
	@AllArgsConstructor
	static class Response<T> {
		private T data;
	}
	//리스트 반환용 클래스

}

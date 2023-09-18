package com.vegetable.samochiro.controller;

import com.vegetable.samochiro.dto.letter.LetterDetailResponse;
import com.vegetable.samochiro.dto.letter.LetterListResponse;
import com.vegetable.samochiro.dto.letter.LetterSaveRequest;
import com.vegetable.samochiro.service.LetterService;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/letter")
public class LetterController {

	private final LetterService letterService;

	@PostMapping
	public ResponseEntity<String> saveNewLetter(@RequestBody LetterSaveRequest saveRequest) {
		try {
			letterService.saveLetter(saveRequest);
			return ResponseEntity.ok().body("편지가 등록되었습니다.");
		}
		catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body("잘못된 요청입니다.");
		}
	}
	//편지 등록 - 서재 1번

	@PostMapping("/list")
	public ResponseEntity<Response> getLetterList(@RequestBody String roomUuid) {
		try {
			List<LetterListResponse> letterList = letterService.findLetterList(roomUuid);
			return ResponseEntity.ok(new Response(letterList));
		}
		catch (Exception e) {
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
	public ResponseEntity<String> deleteLetter(@PathVariable Long letterId) {
		try {
			letterService.deleteLetter(letterId);
			return ResponseEntity.ok().body("삭제되었습니다.");
		}
		catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body("잘못된 요청입니다.");
		}
	}



	@Data
	@AllArgsConstructor
	static class Response<T> {
		private T data;
	}
	//리스트 반환용 클래스

}

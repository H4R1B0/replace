package com.vegetable.samochiro.controller;

import com.vegetable.samochiro.dto.wreath.DeclarationSaveRequest;
import com.vegetable.samochiro.dto.wreath.WreathDetailResponse;
import com.vegetable.samochiro.dto.wreath.WreathListResponse;
import com.vegetable.samochiro.dto.wreath.WreathSaveRequest;
import com.vegetable.samochiro.dto.wreath.WreathUpdateRequest;
import com.vegetable.samochiro.service.WreathService;
import com.vegetable.samochiro.util.HeaderUtils;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/wreath")
public class WreathController {

	private final WreathService wreathService;
	private final HeaderUtils headerUtils;

	@PostMapping
	public ResponseEntity<String> saveNewWreath(@RequestBody WreathSaveRequest saveRequest, @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
		try {
			String userId = headerUtils.getUserId(authorizationHeader);
			wreathService.saveWreath(saveRequest, userId);
			return ResponseEntity.ok("헌화 카드가 등록되었습니다.");
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 요청입니다.");
		}
	}
	//헌화 등록 - 헌화 1번

	@GetMapping
	public ResponseEntity<Response> getWreathList() {
		try {
			List<WreathListResponse> wreathList = wreathService.findWreathList();
			return ResponseEntity.ok(new Response(wreathList));
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body(new Response("잘못된 요청입니다."));
		}
	}
	//헌화 전체 리스트 조회 - 헌화 2번

	@GetMapping("/{wreathId}")
	public ResponseEntity<WreathDetailResponse> getWreathDetail(@PathVariable Long wreathId) {
		try {
			WreathDetailResponse wreathDetail = wreathService.findWreathDetail(wreathId);
			return ResponseEntity.ok(wreathDetail);
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().build();
		}
	}
	//헌화 상세 조회 - 헌화 3번

	@GetMapping("/search")
	public ResponseEntity<Response> searchWreathByTitle(@RequestParam String title) {
		try {
			System.out.println("title " + title);
			List<WreathListResponse> wreathList = wreathService.findTitleWreathList(title);
			return ResponseEntity.ok().body(new Response(wreathList));
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body(new Response("잘못된 요청입니다."));
		}
 	}
	//헌화 제목 검색 - 헌화 4번

	@PutMapping
	public ResponseEntity<String> updateWreathCount(@RequestBody WreathUpdateRequest updateRequest, @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
		try {
			String userId = headerUtils.getUserId(authorizationHeader);
			boolean isNotCompleted = wreathService.updateWreath(updateRequest, userId);
			if(!isNotCompleted) {
				return ResponseEntity.ok().body("이미 완료한 헌화입니다.");
			}
			else {
				return ResponseEntity.ok().body("헌화가 완료되었습니다.");
			}
		}
		catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body("잘못된 요청입니다.");
		}
	}
	//헌화하기 - 헌화 5번

	@PostMapping("/declaration")
	public ResponseEntity<String> saveDeclaration(@RequestBody DeclarationSaveRequest saveRequest, @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
		try {
			String userId = headerUtils.getUserId(authorizationHeader);
			wreathService.saveDeclaration(saveRequest, userId);
			return ResponseEntity.ok("신고 완료되었습니다.");
		}
		catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body("잘못된 요청입니다.");
		}
	}
	//신고 등록 - 헌화 6번

	@Data
	@AllArgsConstructor
	static class Response<T> {
		private T data;
	}
	//리스트 반환용 클래스

}

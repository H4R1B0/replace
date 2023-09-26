package com.vegetable.samochiro.controller;

import com.vegetable.samochiro.dto.common.MessageResponse;
import com.vegetable.samochiro.dto.photo.PhotoDetailResponse;
import com.vegetable.samochiro.dto.photo.PhotoListResponse;
import com.vegetable.samochiro.service.PhotoService;
import com.vegetable.samochiro.util.HeaderUtils;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/frame")
public class PhotoController {

	private final PhotoService photoService;
	private final HeaderUtils headerUtils;

	@PostMapping("/{sequence}")
	public ResponseEntity<MessageResponse> registerPhoto(@PathVariable int sequence,
		@RequestPart(value = "file") MultipartFile imageFile,
		@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {

		try {
			String userId = headerUtils.getUserId(authorizationHeader);
			photoService.registerImageFile(userId, sequence, imageFile);

			return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("사진 등록이 완료되었습니다."));
		}
		catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("잘못된 요청입니다."));
		}
	}
	//사진 등록 - 액자 1번

	@GetMapping("/{sequence}")
	public ResponseEntity<Response> getPhotoList(@PathVariable int sequence,
		@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {

		try {
			String userId = headerUtils.getUserId(authorizationHeader);
			List<PhotoListResponse> photoList = photoService.findPhotoList(userId, sequence);
			return ResponseEntity.ok(new PhotoController.Response(photoList));
		}
		catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body(new PhotoController.Response("잘못된 요청입니다."));
		}
	}
	//사진 리스트 조회 - 액자 2번

	@GetMapping("/detail/{photoId}")
	public ResponseEntity<PhotoDetailResponse> getPhotoDetail(@PathVariable Long photoId) {
		try {
			PhotoDetailResponse photoDetail = photoService.findPhotoDetail(photoId);
			return ResponseEntity.ok().body(photoDetail);
		}
		catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().build();
		}
	}
	//사진 상세 조회 - 액자 3번

	@DeleteMapping("/{photoId}")
	public ResponseEntity<MessageResponse> deletePhoto(@PathVariable Long photoId) {
		try {
			photoService.DeletePhotoById(photoId);
			return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("삭제 되었습니다."));
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("잘못된 요청입니다."));
		}
	}
	//사진 삭제 - 액자 4번

	@Data
	@AllArgsConstructor
	static class Response<T> {
		private T data;
	}
	//리스트 반환용 클래스

}

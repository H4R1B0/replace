package com.vegetable.samochiro.service;

import com.google.cloud.storage.Blob;
import com.vegetable.samochiro.domain.Voice;
import com.vegetable.samochiro.dto.ai.AITrainingRequest;
import com.vegetable.samochiro.repository.RoomRepository;
import com.vegetable.samochiro.repository.VoiceRepository;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@Transactional
@RequiredArgsConstructor
public class AIService {

	private final RoomRepository roomRepository;
	private final VoiceRepository voiceRepository;
	private final GCSService gcsService;

	public void doTraining(AITrainingRequest request, String userId) {
		String roomUuid = roomRepository.findBySequenceAndUserId(request.getSequence(), userId)
			.get().getUuid();
		String gender = request.getGender();
		List<Voice> voiceList = voiceRepository.findByRoomUuid(roomUuid);
		Blob blob = gcsService.test(voiceList.get(0).getName());
		Path path = Paths.get(System.getProperty("user.dir"));
		blob.downloadTo(path);

		// RestTemplate 생성
		RestTemplate restTemplate = new RestTemplate();

		// HTTP Header 설정
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.MULTIPART_FORM_DATA);

		// MultiValueMap에 파일 추가
		LinkedMultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
		body.add("files", new FileSystemResource(new File(path.toUri())));

		// HttpEntity 생성
		HttpEntity<LinkedMultiValueMap<String, Object>> entity = new HttpEntity<>(body, headers);

		// 파일 전송
		String serverUrl = "http://172.30.1.12:8003";
		restTemplate.exchange(serverUrl, HttpMethod.POST, entity, String.class);
		try {
			Files.deleteIfExists(path);
		} catch (Exception e){

		}
		// 로컬에 다운로드된 파일 삭제
//		Files.deleteIfExists(path);
//		List<Blob> blobList = gcsService.downloadFiles(voiceList);
//		//파일 다운로드
//
//		RestTemplate rt = new RestTemplate();
//		HttpHeaders headers = new HttpHeaders();
//		headers.add("Content-Type", "application/json");
//		MultiValueMap<String, Object> params = new LinkedMultiValueMap<>();
//		params.add("files", blobList);
//		HttpEntity<MultiValueMap<String, Object>> kakaoTokenRequest = new HttpEntity<>(params, headers);
//
//		// POST 방식으로 Http 요청한다. 그리고 response 변수의 응답 받는다.
//		ResponseEntity<String> response = rt.exchange(
//			"http://172.30.1.12:8003", // https://{요청할 서버 주소}
//			HttpMethod.POST, // 요청할 방식
//			kakaoTokenRequest, // 요청할 때 보낼 데이터
//			String.class // 요청 시 반환되는 데이터 타입
//		);
	}
	//학습하기 - ai 1번

}

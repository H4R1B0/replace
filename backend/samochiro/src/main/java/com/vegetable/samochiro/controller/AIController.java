package com.vegetable.samochiro.controller;

import com.vegetable.samochiro.dto.ai.AITrainingRequest;
import com.vegetable.samochiro.service.AIService;
import com.vegetable.samochiro.util.HeaderUtils;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ai")
public class AIController {

	private final AIService aiService;
	private final HeaderUtils headerUtils;

	@PostMapping("/training")
	public void doTraining(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader,
		@RequestBody AITrainingRequest request) {
		System.out.println("request = " + request.getGender());
		String userId = headerUtils.getUserId(authorizationHeader);
		aiService.doTraining(request, userId);
	}
	//학습하기 - ai 1번 (from front)

	@PostMapping("/save")
	public void getAIVoiceFile(@RequestPart String roomUuid,
		@RequestPart List<MultipartFile> congratulationList,
		@RequestPart List<MultipartFile> consolationList,
		@RequestPart List<MultipartFile> encourageList ,
		@RequestPart List<MultipartFile> safetyList,
		@RequestPart List<MultipartFile> thanksList,
		@RequestPart List<MultipartFile> welcomeList) {
		System.out.println("옴");
		System.out.println(welcomeList.size());

	}
	//학습된 음성 데이터 받아서 저장 - from ai

	//test용
	@GetMapping
	public String getMsg(){
		return aiService.doTest();
	}
}

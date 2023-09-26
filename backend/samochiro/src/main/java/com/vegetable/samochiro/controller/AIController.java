package com.vegetable.samochiro.controller;

import com.vegetable.samochiro.dto.ai.AITrainingRequest;
import com.vegetable.samochiro.service.AIService;
import com.vegetable.samochiro.util.HeaderUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ai")
public class AIController {

	private final AIService aiService;
	private final HeaderUtils headerUtils;

	@PostMapping
	public void doTraining(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader,
		@RequestBody AITrainingRequest request) {
		System.out.println("request = " + request.getGender());
		String userId = headerUtils.getUserId(authorizationHeader);
		aiService.doTraining(request, userId);
	}
	//학습하기 - ai 1번 (from front)

	//test용
	@GetMapping
	public String getMsg(){
		return aiService.doTest();
	}
}

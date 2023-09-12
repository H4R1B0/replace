package com.vegetable.samochiro.controller;

import com.vegetable.samochiro.dto.KakaoAccount;
import com.vegetable.samochiro.service.KakaoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class KakaoController {

	private final KakaoService kakaoService;

	@GetMapping("/callback")
	public KakaoAccount getKakaoAccount(@RequestParam("code") String code) {
		log.debug("code = {}", code);
		System.out.println("code = " + code);
		return kakaoService.getInfo(code).getKakaoAccount();
	}

	@GetMapping("/login")
	public String login() {
		return "login";
	}

}

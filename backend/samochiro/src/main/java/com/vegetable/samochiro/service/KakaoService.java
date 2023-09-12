package com.vegetable.samochiro.service;

import com.vegetable.samochiro.client.KakaoClient;
import com.vegetable.samochiro.dto.KakaoInfo;
import com.vegetable.samochiro.dto.KakaoToken;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class KakaoService {

	private final KakaoClient client;

	@org.springframework.beans.factory.annotation.Value("${kakao.authUrl}")
	private String kakaoAuthUrl;

	//@Value("${kakao.user-api-url}")
	@org.springframework.beans.factory.annotation.Value("${kakao.userApiUrl}")
	private String kakaoUserApiUrl;

	//@Value("${kakao.restapi-key}")
	@org.springframework.beans.factory.annotation.Value("${kakao.restapiKey}")
	private String restapiKey;

	//@Value("${kakao.redirect-url}")
	@org.springframework.beans.factory.annotation.Value("${kakao.redirectUrl}")
	private String redirectUrl;

	public KakaoInfo getInfo(final String code) {
		final KakaoToken token = getToken(code);
		log.debug("token = {}", token);
		try {
			System.out.println(token.getAccessToken());
			return client.getInfo(new URI(kakaoUserApiUrl), token.getTokenType() + " " + token.getAccessToken());
		} catch (Exception e) {
			log.error("something error..", e);
			return KakaoInfo.fail();
		}
	}

	private KakaoToken getToken(final String code) {
		try {
			return client.getToken(new URI(kakaoAuthUrl), restapiKey, redirectUrl, code, "authorization_code");
		} catch (Exception e) {
			log.error("Something error..", e);
			return KakaoToken.fail();
		}
	}

}

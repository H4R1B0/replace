package com.vegetable.samochiro.client;

import com.vegetable.samochiro.config.KakaoFeignConfiguration;
import com.vegetable.samochiro.dto.KakaoInfo;
import com.vegetable.samochiro.dto.KakaoToken;
import java.net.URI;

import lombok.NoArgsConstructor;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;


@FeignClient(name = "kakaoClient", configuration = KakaoFeignConfiguration.class)
public interface KakaoClient {

	@PostMapping
	KakaoInfo getInfo(URI baseUrl, @RequestHeader("Authorization") String accessToken);

	@PostMapping
	KakaoToken getToken(URI baseUrl, @RequestParam("client_id") String restApiKey,
		@RequestParam("redirect_uri") String redirectUrl,
		@RequestParam("code") String code,
		@RequestParam("grant_type") String grantType);

}
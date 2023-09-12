package com.vegetable.samochiro.config;

import com.vegetable.samochiro.client.KakaoClient;
import feign.Client;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableFeignClients(basePackages = {"com.vegetable.samochiro"})
public class KakaoFeignConfiguration {
	@Bean
	public Client feignClient() {
		return new Client.Default(null, null);
	}
}

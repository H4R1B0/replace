package com.vegetable.samochiro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
public class SamochiroApplication {

	public static void main(String[] args) {
		SpringApplication.run(SamochiroApplication.class, args);
	}

}

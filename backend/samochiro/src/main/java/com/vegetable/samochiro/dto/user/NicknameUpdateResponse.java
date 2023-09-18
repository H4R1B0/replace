package com.vegetable.samochiro.dto.user;

import com.vegetable.samochiro.oauth2.token.JwtToken;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NicknameUpdateResponse {

	private String token;
	private String message;

}

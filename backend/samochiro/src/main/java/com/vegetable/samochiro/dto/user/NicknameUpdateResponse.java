package com.vegetable.samochiro.dto.user;

import com.vegetable.samochiro.dto.Token;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NicknameUpdateResponse {

	private Token token;
	private String message;

}

package com.vegetable.samochiro.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NicknameUpdateRequest {

	private String userId;
	private String nickname;

}

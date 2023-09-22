package com.vegetable.samochiro.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class NicknameUpdateRequest {

	private String nickname;
	private String gender;

}

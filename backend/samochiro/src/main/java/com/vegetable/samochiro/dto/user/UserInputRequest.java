package com.vegetable.samochiro.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserInputRequest {

	private String userId;

	private String email;

	private String nickname;

}

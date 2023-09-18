package com.vegetable.samochiro.dto.user;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserInfoRequest {

	@NotNull
	private String id;

	public UsernameAuthenticationToken toAuthentication() {
		return new UsernameAuthenticationToken(id);
	}

}

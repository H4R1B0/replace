package com.vegetable.samochiro.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class NicknameDuplicateRequest {

	private String nickname;

}

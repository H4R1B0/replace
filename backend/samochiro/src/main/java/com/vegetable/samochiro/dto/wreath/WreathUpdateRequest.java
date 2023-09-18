package com.vegetable.samochiro.dto.wreath;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WreathUpdateRequest {

	private Long wreathId;
	private String userId;
	private String wreathItem;

}

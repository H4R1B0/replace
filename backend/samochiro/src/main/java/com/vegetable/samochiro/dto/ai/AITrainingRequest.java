package com.vegetable.samochiro.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AITrainingRequest {

	private int sequence;
	private String gender;

}

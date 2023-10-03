package com.vegetable.samochiro.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AITrainingRequest {

	private int sequence;
	private String gender;

}

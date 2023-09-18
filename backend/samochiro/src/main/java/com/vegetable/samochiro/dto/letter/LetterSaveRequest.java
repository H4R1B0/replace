package com.vegetable.samochiro.dto.letter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LetterSaveRequest {

	private String title;
	private String content;
	private String writeTime;
	private String roomUuid;
	private String userId;

}

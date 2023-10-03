package com.vegetable.samochiro.dto.letter;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder
@NoArgsConstructor
@AllArgsConstructor
public class LetterListResponse {

	private Long letterId;
	private String title;
	private LocalDateTime writeTime;

}

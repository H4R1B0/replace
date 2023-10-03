package com.vegetable.samochiro.dto.letter;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder
@NoArgsConstructor
@AllArgsConstructor
public class LetterDetailResponse {

	private Long letterId;
	private String title;
	private String content;
	private LocalDateTime writeTime;

}

package com.vegetable.samochiro.dto.photo;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder
@NoArgsConstructor
@AllArgsConstructor
public class PhotoListResponse {

	private Long id;
	private String url;
	private LocalDate registDate;

}

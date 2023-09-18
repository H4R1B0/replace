package com.vegetable.samochiro.dto.wreath;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WreathListResponse {

	private Long wreathId;
	private String title;
	private String subTitle;
	private LocalDate startDate;
	private LocalDate endDate;
	private int flower;
	private int candle;
	private int ribbon;

}

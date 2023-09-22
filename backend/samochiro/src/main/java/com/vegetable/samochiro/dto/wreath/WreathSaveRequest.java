package com.vegetable.samochiro.dto.wreath;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WreathSaveRequest {

	private String title;
	private String subTitle;
	private String description;
	private String startDate; //String으로 들어오면 서비스에서 처리 필요
	private String endDate;

}

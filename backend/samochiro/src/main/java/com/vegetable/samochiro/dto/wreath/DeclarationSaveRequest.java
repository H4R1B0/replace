package com.vegetable.samochiro.dto.wreath;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeclarationSaveRequest {

	private int declarationType;
	private String declarationContent;
	private Long wreathId;

}

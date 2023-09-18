package com.vegetable.samochiro.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/*
집 조회 api - 집 1번 할 때 닉네임과 rooms 반환, 해당 Room도 DTO여야 한다.
그때 사용되는 DTO
*/
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HouseSearchRoomResponse {

	private String roomUuid;
	private String targetName;
	private int sequence;

}

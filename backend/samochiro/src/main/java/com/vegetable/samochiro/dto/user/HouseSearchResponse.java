package com.vegetable.samochiro.dto.user;

import com.vegetable.samochiro.domain.Room;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HouseSearchResponse {

	private String nickname;
	private List<HouseSearchRoomResponse> rooms;

}

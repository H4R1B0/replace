package com.vegetable.samochiro.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Getter
@NoArgsConstructor
public class IsChangeNicknameRequest {

    private String userId;

}

package com.vegetable.samochiro.dto.user;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class IsChangeNicknameResponse {
    private Boolean isChange;
    private String message;
    private String nickname;
}

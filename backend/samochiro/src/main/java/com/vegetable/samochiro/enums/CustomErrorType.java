package com.vegetable.samochiro.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CustomErrorType {
    USER_NOT_FOUND("사용자를 찾을 수 없습니다."),
    USER_ROOM_CANT_REGISTER("사용자 방은 등록할 수 없습니다."),
    OUT_OF_ROOM_RANGE("방 번호는 1, 2, 3입니다."),
    ROOM_NOT_FOUND("해당 방을 찾을 수 없습니다.");
    private final String message;
}

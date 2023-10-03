package com.vegetable.samochiro.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CustomErrorType {
    USER_NOT_FOUND("사용자를 찾을 수 없습니다."),
    USER_ROOM_CANT_REGISTER("사용자 방은 등록할 수 없습니다."),
    OUT_OF_ROOM_RANGE("방 번호는 1, 2, 3입니다."),
    ROOM_NOT_FOUND("해당 방을 찾을 수 없습니다."),
    ROOM_REGISTERED("이미 등록된 방입니다."),
    FIRST_ROOM_CANT_DELETE("1번 방은 삭제할 수 없습니다."),
    VOICEMAIL_CANT_SEND_SELF("보이스메일은 본인에게 보낼 수 없습니다."),
    ALLOW_AUDIO_TYPE("등록 가능한 확장자는 wav, mp3, m4a 입니다."),
    REGISTERED_VOICE_NOT_FOUND("등록된 음성 파일이 없습니다."),
    VOICEMAIL_NOT_FOUND("해당 보이스 메일을 찾을 수 없습니다."),
    LETTER_NOT_FOUND("해당 편지를 찾을 수 없습니다."),
    SITUATION_ENUM("조회 가능한 상황은 CONSOLATION, SAFETY, ENCOURAGE, CONGRATULATION, THANKS, WELCOME 입니다."),
    AIVOICE_NOT_FOUND("학습된 AI 음성이 없습니다."),
    VOICE_NOT_FOUND("음성 파일을 찾을 수 없습니다."),
    USER_NICKNAME_UPDATED("이미 닉네임이 변경되었습니다."),
    BAD_REQUEST("잘못된 요청입니다.");
    private final String message;
}

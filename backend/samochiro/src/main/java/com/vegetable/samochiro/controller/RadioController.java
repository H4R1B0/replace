package com.vegetable.samochiro.controller;

import com.vegetable.samochiro.dto.radio.RadioDeleteVoiceResponse;
import com.vegetable.samochiro.dto.radio.RadioVoiceResponse;
import com.vegetable.samochiro.dto.radio.RadioVoicesResponse;
import com.vegetable.samochiro.enums.CustomErrorType;
import com.vegetable.samochiro.exception.RoomRangeException;
import com.vegetable.samochiro.service.RadioService;
import com.vegetable.samochiro.util.HeaderUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/radio")
public class RadioController {

    private final RadioService radioService;
    private final HeaderUtils headerUtils;

    @GetMapping("/{nickname}/{sequence}")
    public ResponseEntity<RadioVoicesResponse> getVoices(@PathVariable String nickname, @PathVariable int sequence) {
        if (sequence < 1 || sequence > 3) {
            throw new RoomRangeException(CustomErrorType.OUT_OF_ROOM_RANGE.getMessage());
        }

//        String userId = headerUtils.getUserId(authorizationHeader);

        RadioVoicesResponse response = radioService.getVoices(nickname, sequence);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    //음성 파일 리스트 조회 - 라디오 1

    @GetMapping("/detail/{voiceId}")
    public ResponseEntity<RadioVoiceResponse> getVoice(@PathVariable long voiceId) {
        RadioVoiceResponse response = radioService.getVoice(voiceId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    //음성 파일 상세 조회 - 라디오 2

    @DeleteMapping("/{voiceId}")
    public ResponseEntity<RadioDeleteVoiceResponse> deleteVoice(@PathVariable long voiceId) {
        radioService.deleteVoice(voiceId);
        return ResponseEntity.status(HttpStatus.OK).body(RadioDeleteVoiceResponse.builder().message("녹음 음성 파일 삭제에 성공하였습니다.").build());
    }
    //음성 파일 삭제 - 라디오 3

}

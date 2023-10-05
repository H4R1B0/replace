package com.vegetable.samochiro.controller;

import com.vegetable.samochiro.dto.common.MessageResponse;
import com.vegetable.samochiro.dto.room.RegisterTargetNameRequest;
import com.vegetable.samochiro.dto.room.WhoTargetNameResponse;
import com.vegetable.samochiro.enums.CustomErrorType;
import com.vegetable.samochiro.exception.FirstRoomDeleteException;
import com.vegetable.samochiro.exception.RoomRangeException;
import com.vegetable.samochiro.exception.FirstRoomRegisterException;
import com.vegetable.samochiro.oauth2.token.JwtTokenService;
import com.vegetable.samochiro.service.AIVoiceService;
import com.vegetable.samochiro.service.LetterService;
import com.vegetable.samochiro.service.PhotoService;
import com.vegetable.samochiro.service.RoomService;
import com.vegetable.samochiro.service.TelService;
import com.vegetable.samochiro.util.HeaderUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/room")
public class RoomController {

    private final HeaderUtils headerUtils;
    private final RoomService roomService;
    private final JwtTokenService jwtTokenService;
    private final LetterService letterService;
    private final PhotoService photoService;
    private final AIVoiceService aiVoiceService;
    private final TelService telService;

    @PutMapping("/{sequence}")
    public ResponseEntity<MessageResponse> registerTargetName(@PathVariable int sequence, @RequestBody RegisterTargetNameRequest request, @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        if (sequence == 1) {
            throw new FirstRoomRegisterException(CustomErrorType.USER_ROOM_CANT_REGISTER.getMessage());
        }
        if (sequence < 2 || sequence > 3){
            throw new RoomRangeException(CustomErrorType.OUT_OF_ROOM_RANGE.getMessage());
        }
        String userId = headerUtils.getUserId(authorizationHeader);

        roomService.registerTargetName(sequence, userId, request);
        return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("방의 대상이 등록되었습니다."));
    }
    //기억의 방 대상 등록 - 방 1

    @GetMapping("/{nickname}/{sequence}")
    public ResponseEntity<WhoTargetNameResponse> registerTargetName(@PathVariable String nickname, @PathVariable int sequence) {
        if (sequence < 1 || sequence > 3) {
            throw new RoomRangeException(CustomErrorType.OUT_OF_ROOM_RANGE.getMessage());
        }
//        String userId = headerUtils.getUserId(authorizationHeader);

        String targetName = roomService.getTargetName(nickname, sequence);
        return ResponseEntity.status(HttpStatus.OK).body(WhoTargetNameResponse.builder().targetName(targetName).build());
    }
    //기억의 방 대상 찾기

    @DeleteMapping("/{sequence}")
    public ResponseEntity<MessageResponse> deleteRoom(@PathVariable int sequence, @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        if (sequence == 1) {
            throw new FirstRoomDeleteException(CustomErrorType.FIRST_ROOM_CANT_DELETE.getMessage());
        }
        if (sequence < 2 || sequence > 3) {
            throw new RoomRangeException(CustomErrorType.OUT_OF_ROOM_RANGE.getMessage());
        }
        String userId = headerUtils.getUserId(authorizationHeader);
        String roomUuid = roomService.getRoomUuid(sequence, userId);
        //편지 삭제
        letterService.deleteLetterByRoomUuid(roomUuid);
        //사진
        photoService.deletePhotosByRoomUuid(roomUuid);
        //ai 음성
        aiVoiceService.deleteAIVoicesByRoomUuid(roomUuid);
        //음성
        telService.deleteVoicesByRoomUuid(roomUuid);
        //방 대상
        roomService.resetTargetName(roomUuid);

        return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("방 데이터 삭제에 성공하였습니다."));
    }
    //등록된 방 데이터 삭제 - 방 2
}

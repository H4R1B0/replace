package com.vegetable.samochiro.controller;

import com.vegetable.samochiro.dto.room.RegisterTargetNameRequest;
import com.vegetable.samochiro.oauth2.token.JwtTokenService;
import com.vegetable.samochiro.service.RoomService;
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

    private final RoomService roomService;
    private final JwtTokenService jwtTokenService;

    @PutMapping("/{roomSequence}")
    public ResponseEntity<String> registerTargetName(@PathVariable int roomSequence, @RequestBody RegisterTargetNameRequest request, @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        String accessToken = authorizationHeader.substring(7);
        String userId = jwtTokenService.findUserId(accessToken);

        roomService.registerTargetName(roomSequence, userId, request);
        return ResponseEntity.status(HttpStatus.OK).body("방의 대상이 등록되었습니다.");
    }
    //기억의 방 대상 등록 - 방 1

}

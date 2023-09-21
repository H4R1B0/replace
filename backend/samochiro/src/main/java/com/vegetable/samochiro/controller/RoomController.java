package com.vegetable.samochiro.controller;

import com.vegetable.samochiro.dto.room.RegisterTargetNameRequest;
import com.vegetable.samochiro.service.RoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/room")
public class RoomController {

    private final RoomService roomService;

    @PutMapping
    public ResponseEntity<String> registerTargetName(@RequestBody RegisterTargetNameRequest request) {
        roomService.registerTargetName(request);
        return ResponseEntity.status(HttpStatus.OK).body("");
    }
    //기억의 방 대상 등록 - 방 1

}

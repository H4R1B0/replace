package com.vegetable.samochiro.controller;

import com.vegetable.samochiro.service.TelService;
import com.vegetable.samochiro.util.HeaderUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/tel")
public class TelController {

    private final HeaderUtils headerUtils;
    private final TelService telService;

    @PostMapping("/{sequence}")
    public ResponseEntity<String> registerAudioFile(@PathVariable int sequence, @RequestPart MultipartFile audioFile, @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        String userId = headerUtils.getUserId(authorizationHeader);
        //사용자 아이디, 방 번호, 파일
        telService.registerAudioFile(userId, sequence, audioFile);
        return ResponseEntity.status(HttpStatus.OK).body("음성 파일이 등록되었습니다.");
    }
    //음성 파일 등록 - 전화기 1

}

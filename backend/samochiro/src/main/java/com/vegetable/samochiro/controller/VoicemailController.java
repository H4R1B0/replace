package com.vegetable.samochiro.controller;

import com.vegetable.samochiro.dto.voicemail.DeleteVoicemailResponse;
import com.vegetable.samochiro.dto.voicemail.VoicemailItemsResponse;
import com.vegetable.samochiro.dto.voicemail.RegisterVoicemailRequest;
import com.vegetable.samochiro.dto.voicemail.RegisterVoicemailResponse;
import com.vegetable.samochiro.dto.voicemail.VoicemailResponse;
import com.vegetable.samochiro.service.VoicemailService;
import com.vegetable.samochiro.util.HeaderUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/voicemail")
public class VoicemailController {

    private final VoicemailService voicemailService;
    private final HeaderUtils headerUtils;

    @PostMapping
    public ResponseEntity<RegisterVoicemailResponse> registerVoicemail(
            @RequestPart(value = "request") RegisterVoicemailRequest registerVoicemailRequest,
            @RequestPart(value = "file") MultipartFile voicemailFile,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader
    ) {
        String fromUserId = headerUtils.getUserId(authorizationHeader);
        voicemailService.registerVoicemail(registerVoicemailRequest, fromUserId, voicemailFile);
        RegisterVoicemailResponse response = RegisterVoicemailResponse.builder().message("보이스 메일이 정상적으로 등록되었습니다.").build();
        return ResponseEntity.ok().body(response);
    }
    //보이스 메일 등록 - 골목길 1

    @GetMapping
    public ResponseEntity<VoicemailItemsResponse> getVoicemails(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        String userId = headerUtils.getUserId(authorizationHeader);
        VoicemailItemsResponse response = voicemailService.getVoicemails(userId);
        return ResponseEntity.ok().body(response);
    }
    //보이스 메일 리스트 조회 - 골목길 2

    @GetMapping("/{voicemailId}")
    public ResponseEntity<VoicemailResponse> getVoicemail(@PathVariable long voicemailId) {
        VoicemailResponse response = voicemailService.getVoicemail(voicemailId);
        return ResponseEntity.ok().body(response);
    }
    //보이스 메일 상세 조회 - 골목길 3

    @DeleteMapping("/{voicemailId}")
    public ResponseEntity<DeleteVoicemailResponse> deleteVoicemail(@PathVariable long voicemailId) {
        voicemailService.deleteVoicemail(voicemailId);
        DeleteVoicemailResponse response = DeleteVoicemailResponse.builder().message("정상적으로 삭제 되었습니다.").build();
        return ResponseEntity.ok().body(response);
    }
    //보이스 메일 삭제 - 골목길 4

}

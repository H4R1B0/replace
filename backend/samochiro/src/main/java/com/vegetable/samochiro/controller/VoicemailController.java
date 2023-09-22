package com.vegetable.samochiro.controller;

import com.vegetable.samochiro.service.GCSService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/voicemail")
public class VoicemailController {

    private final GCSService gcsService;

    @PostMapping
    public ResponseEntity<String> test(@RequestBody MultipartFile file) {

        String currentTime = LocalDateTime.now().toString();
        String fileName = currentTime + "vm" + file.getOriginalFilename();
        String url = gcsService.uploadFile(fileName, file);


        return ResponseEntity.ok().body(url);
    }

}

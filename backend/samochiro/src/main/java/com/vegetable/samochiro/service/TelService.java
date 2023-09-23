package com.vegetable.samochiro.service;


import com.vegetable.samochiro.domain.Room;
import com.vegetable.samochiro.domain.Voice;
import com.vegetable.samochiro.repository.RoomObjectRepository;
import com.vegetable.samochiro.repository.RoomRepository;
import com.vegetable.samochiro.repository.VoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TelService {

    private final RoomRepository roomRepository;
    private final GCSService gcsService;
    private final VoiceRepository voiceRepository;
    private final String AUDIO_KEYWORD = "au";

    @Transactional
    public void registerAudioFile(String userId, int sequence, MultipartFile audioFile) {
        Room room = roomRepository.findBySequenceAndUserId(sequence, userId).get();
        String currentTime = LocalDateTime.now().toString();
        String fileName = currentTime + AUDIO_KEYWORD + audioFile.getOriginalFilename();
        String audioUrl = gcsService.uploadFile(fileName, audioFile);
        Voice voice = Voice.builder()
                .url(audioUrl)
                .name(fileName)
                .registDate(LocalDateTime.now())
                .room(room)
                .build();
        voiceRepository.save(voice);
    }
    //음성 파일 등록 - 전화기 1
}

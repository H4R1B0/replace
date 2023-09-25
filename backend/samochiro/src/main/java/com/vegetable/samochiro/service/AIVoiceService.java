package com.vegetable.samochiro.service;

import com.vegetable.samochiro.domain.AIVoice;
import com.vegetable.samochiro.repository.AIVoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AIVoiceService {

    private final AIVoiceRepository aiVoiceRepository;
    private final GCSService gcsService;

    @Transactional
    public void deleteAIVoicesByRoomUuid(String roomUuid) {
        List<AIVoice> aiVoices = aiVoiceRepository.findAllByRoomUuid(roomUuid);
        for (AIVoice aiVoice : aiVoices) {
            gcsService.deleteFile(aiVoice.getName());
            aiVoiceRepository.deleteById(aiVoice.getId());
        }
    }
    //AI 음성 삭제 - 방 2
}

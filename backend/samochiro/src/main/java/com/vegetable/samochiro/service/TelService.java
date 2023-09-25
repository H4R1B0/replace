package com.vegetable.samochiro.service;


import com.vegetable.samochiro.domain.AIVoice;
import com.vegetable.samochiro.domain.Room;
import com.vegetable.samochiro.domain.Voice;
import com.vegetable.samochiro.dto.tel.GetAiVoiceResponse;
import com.vegetable.samochiro.enums.SituationType;
import com.vegetable.samochiro.repository.AIVoiceRepository;
import com.vegetable.samochiro.repository.RoomRepository;
import com.vegetable.samochiro.repository.VoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TelService {

    private final RoomRepository roomRepository;
    private final GCSService gcsService;
    private final VoiceRepository voiceRepository;
    private final AIVoiceRepository aiVoiceRepository;
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

    public GetAiVoiceResponse getAiVoice(String userId, int sequence, SituationType situationType) {
        String roomUuid = roomRepository.findBySequenceAndUserId(sequence, userId).get().getUuid();
        List<AIVoice> AIVoices = aiVoiceRepository.findByRoomUuidAndSituation(roomUuid, situationType);
        int aiVoicesSize = AIVoices.size();
        Random random = new Random();
        int idx = random.nextInt(aiVoicesSize);
        return GetAiVoiceResponse.builder()
                .message("AI 음성 조회에 성공하였습니다.")
                .voiceFileUrl(AIVoices.get(idx).getUrl())
                .build();
    }

    @Transactional
    public void deleteVoicesByRoomUuid(String roomUuid) {
        List<Voice> voices = voiceRepository.findByRoomUuid(roomUuid);
        for(Voice voice : voices){
            gcsService.deleteFile(voice.getName());
            voiceRepository.deleteById(voice.getId());
        }
    }
    //생성된 AI 음성 조회 - 전화기 3
}

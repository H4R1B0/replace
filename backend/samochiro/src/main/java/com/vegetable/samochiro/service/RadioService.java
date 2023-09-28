package com.vegetable.samochiro.service;

import com.vegetable.samochiro.domain.Voice;
import com.vegetable.samochiro.dto.radio.RadioVoiceResponse;
import com.vegetable.samochiro.dto.radio.RadioVoicesResponse;
import com.vegetable.samochiro.dto.radio.VoiceItem;
import com.vegetable.samochiro.repository.RoomRepository;
import com.vegetable.samochiro.repository.VoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RadioService {

    private final RoomRepository roomRepository;
    private final VoiceRepository voiceRepository;

    public RadioVoicesResponse getVoices(String userId, int sequence) {
        String roomUuid = roomRepository.findBySequenceAndUserId(sequence, userId).get().getUuid();
        List<Voice> voices = voiceRepository.findByRoomUuid(roomUuid);
        List<VoiceItem> voiceItems = new ArrayList<>();
        for (Voice voice : voices) {
            voiceItems.add(
                    VoiceItem.builder()
                            .voiceId(voice.getId())
                            .registDate(voice.getRegistDate())
                            .voiceUrl(voice.getUrl())
                            .build()
            );
        }
        return RadioVoicesResponse.builder()
                .voiceItems(voiceItems)
                .total(voices.size())
                .build();
    }
    //음성 파일 리스트 조회 - 라디오 1

    public RadioVoiceResponse getVoice(long voiceId) {
        Voice voice = voiceRepository.findById(voiceId).get();
        return RadioVoiceResponse.builder()
                .voiceId(voiceId)
                .voiceUrl(voice.getUrl())
                .registDate(voice.getRegistDate())
                .build();
    }
    //음성 파일 상세 조회 - 라디오 2

    @Transactional
    public void deleteVoice(long voiceId) {
        voiceRepository.deleteById(voiceId);
    }
    //음성 파일 삭제 - 라디오 3
}

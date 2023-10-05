package com.vegetable.samochiro.service;

import com.vegetable.samochiro.domain.Room;
import com.vegetable.samochiro.domain.User;
import com.vegetable.samochiro.domain.Voice;
import com.vegetable.samochiro.dto.radio.RadioVoiceResponse;
import com.vegetable.samochiro.dto.radio.RadioVoicesResponse;
import com.vegetable.samochiro.dto.radio.VoiceItem;
import com.vegetable.samochiro.enums.CustomErrorType;
import com.vegetable.samochiro.exception.RoomNotFoundException;
import com.vegetable.samochiro.exception.UserNotFoundException;
import com.vegetable.samochiro.exception.VoiceNotFoundException;
import com.vegetable.samochiro.repository.RoomRepository;
import com.vegetable.samochiro.repository.UserRepository;
import com.vegetable.samochiro.repository.VoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RadioService {

    private final RoomRepository roomRepository;
    private final VoiceRepository voiceRepository;
    private final UserRepository userRepository;

    public RadioVoicesResponse getVoices(String nickname, int sequence) {
        Optional<User> findUser = userRepository.findByNickname(nickname);
        if (findUser.isEmpty()) {
            throw new UserNotFoundException(CustomErrorType.USER_NOT_FOUND.getMessage());
        }

        Optional<Room> findRoom = roomRepository.findBySequenceAndUserId(sequence, findUser.get().getId());
        if (findRoom.isEmpty()) {
            throw new RoomNotFoundException(CustomErrorType.ROOM_NOT_FOUND.getMessage());
        }

        String roomUuid = findRoom.get().getUuid();
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
        Optional<Voice> voice = voiceRepository.findById(voiceId);
        if (voice.isEmpty()) {
            throw new VoiceNotFoundException(CustomErrorType.VOICE_NOT_FOUND.getMessage());
        }
        return RadioVoiceResponse.builder()
                .voiceId(voiceId)
                .voiceUrl(voice.get().getUrl())
                .registDate(voice.get().getRegistDate())
                .build();
    }
    //음성 파일 상세 조회 - 라디오 2

    @Transactional
    public void deleteVoice(long voiceId) {
        Optional<Voice> voice = voiceRepository.findById(voiceId);
        if (voice.isEmpty()) {
            throw new VoiceNotFoundException(CustomErrorType.VOICE_NOT_FOUND.getMessage());
        }
        voiceRepository.delete(voice.get());
    }
    //음성 파일 삭제 - 라디오 3
}

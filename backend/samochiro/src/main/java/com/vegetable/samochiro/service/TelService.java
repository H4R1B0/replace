package com.vegetable.samochiro.service;


import com.vegetable.samochiro.domain.AIVoice;
import com.vegetable.samochiro.domain.Room;
import com.vegetable.samochiro.domain.User;
import com.vegetable.samochiro.domain.Voice;
import com.vegetable.samochiro.dto.tel.GetAiVoiceResponse;
import com.vegetable.samochiro.enums.CustomErrorType;
import com.vegetable.samochiro.enums.SituationType;
import com.vegetable.samochiro.exception.AIVoiceNotFoundException;
import com.vegetable.samochiro.exception.RoomNotFoundException;
import com.vegetable.samochiro.exception.UserNotFoundException;
import com.vegetable.samochiro.repository.AIVoiceRepository;
import com.vegetable.samochiro.repository.RoomRepository;
import com.vegetable.samochiro.repository.UserRepository;
import com.vegetable.samochiro.repository.VoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TelService {

    private final RoomRepository roomRepository;
    private final GCSService gcsService;
    private final VoiceRepository voiceRepository;
    private final AIVoiceRepository aiVoiceRepository;
    private final UserRepository userRepository;
    private final String AUDIO_KEYWORD = "au";

    @Transactional
    public void registerAudioFile(String userId, int sequence, MultipartFile audioFile) {
        Optional<Room> findRoom = roomRepository.findBySequenceAndUserId(sequence, userId);
        if (findRoom.isEmpty()) {
            throw new RoomNotFoundException(CustomErrorType.ROOM_NOT_FOUND.getMessage());
        }

        String currentTime = LocalDateTime.now().toString();
        String fileName = currentTime + AUDIO_KEYWORD + audioFile.getOriginalFilename();
        String audioUrl = gcsService.uploadFile(fileName, audioFile);
        Voice voice = Voice.builder()
                .url(audioUrl)
                .name(fileName)
                .registDate(LocalDateTime.now())
                .room(findRoom.get())
                .build();
        voiceRepository.save(voice);
    }
    //음성 파일 등록 - 전화기 1

    public GetAiVoiceResponse getAiVoice(String nickname, int sequence, SituationType situationType) {
        Optional<User> findUser = userRepository.findByNickname(nickname);
        if (findUser.isEmpty()) {
            throw new UserNotFoundException(CustomErrorType.USER_NOT_FOUND.getMessage());
        }

        Optional<Room> findRoom = roomRepository.findBySequenceAndUserId(sequence, findUser.get().getId());
        if (findRoom.isEmpty()) {
            throw new RoomNotFoundException(CustomErrorType.ROOM_NOT_FOUND.getMessage());
        }
        String roomUuid = findRoom.get().getUuid();
        List<AIVoice> AIVoices = aiVoiceRepository.findByRoomUuidAndSituation(roomUuid, situationType);
        int aiVoicesSize = AIVoices.size();
        if (aiVoicesSize == 0) {
            throw new AIVoiceNotFoundException(CustomErrorType.AIVOICE_NOT_FOUND.getMessage());
        }
        Random random = new Random();
        int idx = random.nextInt(aiVoicesSize);
        return GetAiVoiceResponse.builder()
            .message("AI 음성 조회에 성공하였습니다.")
            .voiceFileUrl(AIVoices.get(idx).getUrl())
            .build();
    }
    //생성된 AI 음성 조회 - 전화기 3

    @Transactional
    public void deleteVoicesByRoomUuid(String roomUuid) {
        List<Voice> voices = voiceRepository.findByRoomUuid(roomUuid);
        for(Voice voice : voices){
            gcsService.deleteFile(voice.getName());
            voiceRepository.deleteById(voice.getId());
        }
    }
    //등록된 방 데이터 삭제 - 방 2
}

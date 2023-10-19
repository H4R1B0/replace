package com.vegetable.samochiro.service;

import com.vegetable.samochiro.domain.Alarm;
import com.vegetable.samochiro.domain.User;
import com.vegetable.samochiro.domain.Voicemail;
import com.vegetable.samochiro.dto.voicemail.RegisterVoicemailRequest;
import com.vegetable.samochiro.dto.voicemail.VoicemailItem;
import com.vegetable.samochiro.dto.voicemail.VoicemailItemsResponse;
import com.vegetable.samochiro.dto.voicemail.VoicemailResponse;
import com.vegetable.samochiro.enums.CustomErrorType;
import com.vegetable.samochiro.exception.UserNotFoundException;
import com.vegetable.samochiro.exception.VoicemailNotFoundException;
import com.vegetable.samochiro.repository.AlarmRepository;
import com.vegetable.samochiro.repository.UserRepository;
import com.vegetable.samochiro.repository.VoicemailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class VoicemailService {

    private final GCSService gcsService;
    private final UserRepository userRepository;
    private final VoicemailRepository voicemailRepository;
    private final AlarmRepository alarmRepository;

    @Transactional
    public void registerVoicemail(RegisterVoicemailRequest request, String fromUserId, MultipartFile voicemailFile) {
        String toUserNickname = request.getToUserNickname();
        Optional<User> findFromUser = userRepository.findById(fromUserId);
        Optional<User> findToUser = userRepository.findByNickname(toUserNickname);
        if (findFromUser.isEmpty() || findToUser.isEmpty()) {
            throw new UserNotFoundException(CustomErrorType.USER_NOT_FOUND.getMessage());
        }

        String currentTime = LocalDateTime.now().toString();
        String fileName = currentTime + "vm" + voicemailFile.getOriginalFilename();
        String url = gcsService.uploadFile(fileName, voicemailFile);
        Voicemail voicemail = Voicemail.builder()
                .url(url)
                .sendDate(LocalDateTime.now())
                .name(fileName)
                .fromUser(findFromUser.get())
                .toUser(findToUser.get())
                .build();
        voicemailRepository.save(voicemail);

        String fromUserNickname = findFromUser.get().getNickname();
        Alarm alarm = Alarm.builder()
                .message(fromUserNickname + "님으로부터 보이스 메일이 도착했습니다! 지금 바로 확인해 볼까요?")
                .user(findToUser.get())
                .build();
        alarmRepository.save(alarm);

    }
    //보이스 메일 등록 - 골목길 1

    public VoicemailItemsResponse getVoicemails(String userId) {
        List<VoicemailItem> voicemailItems = voicemailRepository.getVoicemails(userId);
        return VoicemailItemsResponse.builder().voicemails(voicemailItems).build();
    }
    //보이스 메일 리스트 조회 - 골목길 2


    public VoicemailResponse getVoicemail(long voicemailId) {
        Optional<Voicemail> findVoicemail = voicemailRepository.findById(voicemailId);
        if (findVoicemail.isEmpty()) {
            throw new VoicemailNotFoundException(CustomErrorType.VOICEMAIL_NOT_FOUND.getMessage());
        }
        return VoicemailResponse.builder()
                .voicemailId(findVoicemail.get().getId())
                .sendDate(findVoicemail.get().getSendDate())
                .voicemailUrl(findVoicemail.get().getUrl())
                .fromUserNickname(findVoicemail.get().getFromUser().getNickname()).build();
    }
    //보이스 메일 상세 조회 - 골목길 3

    @Transactional
    public void deleteVoicemail(long voicemailId) {
        Optional<Voicemail> findVoicemail = voicemailRepository.findById(voicemailId);
        if (findVoicemail.isEmpty()) {
            throw new VoicemailNotFoundException(CustomErrorType.VOICEMAIL_NOT_FOUND.getMessage());
        }
        String voicemailName = findVoicemail.get().getName();
        gcsService.deleteFile(voicemailName);
        voicemailRepository.deleteById(voicemailId);
    }
    //보이스 메일 삭제 - 골목길 4

    @Transactional
    public void deleteVoicemailsByUserId(String userId) {
        List<Voicemail> voicemails = voicemailRepository.findByUserId(userId);
        for (Voicemail voicemail : voicemails) {
            gcsService.deleteFile(voicemail.getName());
            voicemailRepository.deleteById(voicemail.getId());
        }
    }
    //보이스 메일 삭제 - 유저 8
}

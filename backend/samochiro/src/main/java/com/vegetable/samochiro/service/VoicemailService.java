package com.vegetable.samochiro.service;

import com.vegetable.samochiro.domain.Voicemail;
import com.vegetable.samochiro.dto.voicemail.RegisterVoicemailRequest;
import com.vegetable.samochiro.dto.voicemail.VoicemailItem;
import com.vegetable.samochiro.dto.voicemail.VoicemailItemsResponse;
import com.vegetable.samochiro.dto.voicemail.VoicemailResponse;
import com.vegetable.samochiro.repository.UserRepository;
import com.vegetable.samochiro.repository.VoicemailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class VoicemailService {

    private final GCSService gcsService;
    private final UserRepository userRepository;
    private final VoicemailRepository voicemailRepository;

    @Transactional
    public void registerVoicemail(RegisterVoicemailRequest request, String fromUserId, MultipartFile voicemailFile) {
        String currentTime = LocalDateTime.now().toString();
        String fileName = currentTime + "vm" + voicemailFile.getOriginalFilename();
        String url = gcsService.uploadFile(fileName, voicemailFile);
        String toUserNickname = request.getToUserNickname();
        String toUserId = userRepository.findByNickname(toUserNickname).get().getId();
        Voicemail voicemail = Voicemail.builder()
                .url(url)
                .sendDate(LocalDateTime.now())
                .name(fileName)
                .fromUser(userRepository.findById(fromUserId).get())
                .toUser(userRepository.findById(toUserId).get())
                .build();
        voicemailRepository.save(voicemail);
    }
    //보이스 메일 등록 - 골목길 1

    public VoicemailItemsResponse getVoicemails(String userId) {
        List<VoicemailItem> voicemailItems = voicemailRepository.getVoicemails(userId);
        return VoicemailItemsResponse.builder().voicemails(voicemailItems).build();
    }
    //보이스 메일 리스트 조회 - 골목길 2


    public VoicemailResponse getVoicemail(long voicemailId) {
        Voicemail voicemail = voicemailRepository.findById(voicemailId).get();
        return VoicemailResponse.builder()
                .voicemailId(voicemail.getId())
                .sendDate(voicemail.getSendDate())
                .voicemailUrl(voicemail.getUrl())
                .fromUserNickname(voicemail.getToUser().getNickname()).build();
    }
    //보이스 메일 상세 조회 - 골목길 3

    @Transactional
    public void deleteVoicemail(long voicemailId) {
        String voicemailName = voicemailRepository.findById(voicemailId).get().getName();
        gcsService.deleteFile(voicemailName);
        voicemailRepository.deleteById(voicemailId);
    }
    //보이스 메일 삭제 - 골목길 4
}

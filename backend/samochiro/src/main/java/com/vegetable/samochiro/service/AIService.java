package com.vegetable.samochiro.service;

import com.google.cloud.storage.Blob;
import com.vegetable.samochiro.domain.Voice;
import com.vegetable.samochiro.dto.ai.AITrainingRequest;
import com.vegetable.samochiro.dto.ai.MultipartInputStreamFileResource;
import com.vegetable.samochiro.repository.RoomRepository;
import com.vegetable.samochiro.repository.VoiceRepository;

import java.nio.channels.Channels;
import java.util.List;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class AIService {

    private final RoomRepository roomRepository;
    private final VoiceRepository voiceRepository;
    private final GCSService gcsService;
    @Value("${url.gpu}")
    private String serverUrl;

    public void doTraining(AITrainingRequest request, String userId) {
        String roomUuid = roomRepository.findBySequenceAndUserId(request.getSequence(), userId)
            .get().getUuid();
        String gender = request.getGender();

        //파일 목록 조회
        List<Voice> voices = voiceRepository.findByRoomUuid(roomUuid);

        MultiValueMap<String, Object> multiPartBody = new LinkedMultiValueMap<>();

        try {
            for (Voice voice : voices) {
                String fileName = voice.getName();
                Blob blob = gcsService.getBlob(fileName);

                // Blob을 InputStreamResource로 변환
                Resource resource = new InputStreamResource(Channels.newInputStream(blob.reader()));
                multiPartBody.add("files", new MultipartInputStreamFileResource(resource.getInputStream(), fileName));
            }
        } catch (Exception e) {

        }

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(multiPartBody, headers);
        ResponseEntity<String> responseEntity = restTemplate.exchange(serverUrl, HttpMethod.POST, requestEntity, String.class);
    }
    //학습하기 - ai 1번

    public String doTest() {
        log.info("테스트 시작");
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(headers);
        return restTemplate.exchange(serverUrl, HttpMethod.GET, requestEntity, String.class).toString();
    }


}

package com.vegetable.samochiro.service;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.Storage;
import com.vegetable.samochiro.domain.Voice;
import com.vegetable.samochiro.dto.ai.AITrainingRequest;
import com.vegetable.samochiro.dto.ai.MultipartInputStreamFileResource;
import com.vegetable.samochiro.repository.RoomRepository;
import com.vegetable.samochiro.repository.VoiceRepository;

import java.io.DataOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.channels.Channels;
import java.util.ArrayList;
import java.util.List;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
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
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    private final RoomRepository roomRepository;
    private final VoiceRepository voiceRepository;
    private final GCSService gcsService;
    @Value("${url.gpu}")
    private String serverUrl;
    private static final String BOUNDARY = "*****";

    public void doTraining(AITrainingRequest request, String userId) {
        String roomUuid = roomRepository.findBySequenceAndUserId(request.getSequence(), userId)
            .get().getUuid();
        String gender = request.getGender();

        //파일 목록 조회
        List<Voice> voices = voiceRepository.findByRoomUuid(roomUuid);
        List<Blob> blobs = new ArrayList<>();
        try {
            URL url = new URL(serverUrl);

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            connection.setRequestMethod("POST");
            connection.setDoOutput(true);
            connection.setDoInput(true);
            connection.setRequestProperty("Content-Type", "multipart/form-data;boundary=" + BOUNDARY);

            for (Voice voice : voices) {
                blobs.add(gcsService.getBlob(voice.getName()));
            }

            try (DataOutputStream dos = new DataOutputStream(connection.getOutputStream())) {

                for (Blob blob : blobs) {
                    // 파일 파트 헤더 작성
                    dos.writeBytes("--" + BOUNDARY + "\r\n");
                    dos.writeBytes("Content-Disposition: form-data; name=\"files\";filename=\"" +
                        blob.getName() + "\"\r\n");
                    dos.writeBytes("\r\n");

                    // Blob에서 데이터를 읽어서 전송
                    try (InputStream is = Channels.newInputStream(blob.reader())) {
                        byte[] buffer = new byte[4096];
                        int bytesRead;
                        while ((bytesRead = is.read(buffer)) != -1) {
                            dos.write(buffer, 0, bytesRead);
                        }
                    }
                    dos.writeBytes("\r\n");
                }
                dos.writeBytes("--" + BOUNDARY + "--\r\n");
            }
            // 응답 확인
            int responseCode = connection.getResponseCode();
            System.out.println("Response Code : " + responseCode);
            if (responseCode == HttpURLConnection.HTTP_OK) {
                System.out.println("Files uploaded successfully!");
            } else {
                System.out.println("File upload failed with response code: " + responseCode);
            }
        } catch (Exception e) {

        }
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

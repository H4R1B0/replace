package com.vegetable.samochiro.service;

import com.google.cloud.storage.Blob;
import com.google.gson.Gson;
import com.vegetable.samochiro.domain.AIVoice;
import com.vegetable.samochiro.domain.Room;
import com.vegetable.samochiro.domain.Voice;
import com.vegetable.samochiro.dto.ai.AITrainingRequest;
import com.vegetable.samochiro.dto.ai.DataPayload;
import com.vegetable.samochiro.enums.CustomErrorType;
import com.vegetable.samochiro.enums.SituationType;
import com.vegetable.samochiro.exception.RoomNotFoundException;
import com.vegetable.samochiro.exception.VoiceCountZeroException;
import com.vegetable.samochiro.repository.AIVoiceRepository;
import com.vegetable.samochiro.repository.RoomRepository;
import com.vegetable.samochiro.repository.VoiceRepository;

import java.io.DataOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.channels.Channels;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

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
    private final AIVoiceRepository aiVoiceRepository;
    @Value("${url.gpu}")
    private String serverUrl;
    private static final String BOUNDARY = "*****";

    public void doTraining(AITrainingRequest request, String userId) {
        Optional<Room> findRoom = roomRepository.findBySequenceAndUserId(request.getSequence(), userId);
        if (findRoom.isEmpty())
            throw new RoomNotFoundException(CustomErrorType.ROOM_NOT_FOUND.getMessage());
        String roomUuid = findRoom.get().getUuid();
        System.out.println("roomUuid = " + roomUuid);
        String gender = request.getGender();

        //파일 목록 조회
        List<Voice> voices = voiceRepository.findByRoomUuid(roomUuid);
        if (voices.size() == 0)
            throw new VoiceCountZeroException(CustomErrorType.REGISTERED_VOICE_NOT_FOUND.getMessage());

        System.out.println("voices.size() = " + voices.size());

        List<String> fileUrls = new ArrayList<>();

        for (Voice voice : voices) {
            fileUrls.add(voice.getUrl());
        }
        //url 테스트

        // 객체 생성 및 데이터 설정
        DataPayload payload = new DataPayload(roomUuid, gender, fileUrls);

        // Gson 객체 생성 및 JSON 변환
        Gson gson = new Gson();
        String jsonPayload = gson.toJson(payload);

        try {
            // HttpURLConnection 객체 생성 및 설정
            URL url = new URL(serverUrl + "/ai");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            connection.setDoOutput(true);

            // 데이터 전송
            try (OutputStream os = connection.getOutputStream()) {
                byte[] input = jsonPayload.getBytes("UTF-8");
                os.write(input, 0, input.length);
            }

            // 서버 응답 확인
            int responseCode = connection.getResponseCode();
            System.out.println("HTTP Response Code: " + responseCode);

        } catch (Exception e) {
            e.printStackTrace();
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

    public void saveAIVoiceFile(String roomUuid, List<MultipartFile> congratulationList, List<MultipartFile> consolationList,
                                List<MultipartFile> encourageList, List<MultipartFile> safetyList, List<MultipartFile> thanksList, List<MultipartFile> welcomeList) {

        String currentTime = LocalDateTime.now().toString();
        Room room = roomRepository.findById(roomUuid).get();
        LocalDateTime current = LocalDateTime.now();

        if (congratulationList.size() > 0) {
            for (MultipartFile file : congratulationList) {
                String fileName = currentTime + "ai" + file.getOriginalFilename();
                String url = gcsService.uploadFile(fileName, file);

                AIVoice aiVoice = AIVoice.builder()
                    .url(url)
                    .name(fileName)
                    .registDate(current)
                    .situationType(SituationType.CONGRATULATION)
                    .room(room)
                    .build();

                aiVoiceRepository.save(aiVoice);
            }
        }

        if (consolationList.size() > 0) {
            for (MultipartFile file : consolationList) {
                String fileName = currentTime + "ai" + file.getOriginalFilename();
                String url = gcsService.uploadFile(fileName, file);

                AIVoice aiVoice = AIVoice.builder()
                    .url(url)
                    .name(fileName)
                    .registDate(current)
                    .situationType(SituationType.CONSOLATION)
                    .room(room)
                    .build();

                aiVoiceRepository.save(aiVoice);
            }
        }

        if (encourageList.size() > 0) {
            for (MultipartFile file : encourageList) {
                String fileName = currentTime + "ai" + file.getOriginalFilename();
                String url = gcsService.uploadFile(fileName, file);

                AIVoice aiVoice = AIVoice.builder()
                    .url(url)
                    .name(fileName)
                    .registDate(current)
                    .situationType(SituationType.ENCOURAGE)
                    .room(room)
                    .build();

                aiVoiceRepository.save(aiVoice);
            }
        }

        if (safetyList.size() > 0) {
            for (MultipartFile file : safetyList) {
                String fileName = currentTime + "ai" + file.getOriginalFilename();
                String url = gcsService.uploadFile(fileName, file);

                AIVoice aiVoice = AIVoice.builder()
                    .url(url)
                    .name(fileName)
                    .registDate(current)
                    .situationType(SituationType.SAFETY)
                    .room(room)
                    .build();

                aiVoiceRepository.save(aiVoice);
            }
        }

        if (thanksList.size() > 0) {
            for (MultipartFile file : thanksList) {
                String fileName = currentTime + "ai" + file.getOriginalFilename();
                String url = gcsService.uploadFile(fileName, file);

                AIVoice aiVoice = AIVoice.builder()
                    .url(url)
                    .name(fileName)
                    .registDate(current)
                    .situationType(SituationType.THANKS)
                    .room(room)
                    .build();

                aiVoiceRepository.save(aiVoice);
            }
        }

        if (welcomeList.size() > 0) {
            for (MultipartFile file : welcomeList) {
                String fileName = currentTime + "ai" + file.getOriginalFilename();
                String url = gcsService.uploadFile(fileName, file);

                AIVoice aiVoice = AIVoice.builder()
                    .url(url)
                    .name(fileName)
                    .registDate(current)
                    .situationType(SituationType.WELCOME)
                    .room(room)
                    .build();

                aiVoiceRepository.save(aiVoice);
            }
        }

    }

}

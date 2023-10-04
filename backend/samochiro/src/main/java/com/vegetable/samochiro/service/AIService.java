package com.vegetable.samochiro.service;

import com.google.cloud.storage.Blob;
import com.vegetable.samochiro.domain.AIVoice;
import com.vegetable.samochiro.domain.Room;
import com.vegetable.samochiro.domain.Voice;
import com.vegetable.samochiro.dto.ai.AITrainingRequest;
import com.vegetable.samochiro.enums.CustomErrorType;
import com.vegetable.samochiro.enums.SituationType;
import com.vegetable.samochiro.exception.RoomNotFoundException;
import com.vegetable.samochiro.exception.VoiceCountZeroException;
import com.vegetable.samochiro.repository.AIVoiceRepository;
import com.vegetable.samochiro.repository.RoomRepository;
import com.vegetable.samochiro.repository.VoiceRepository;

import java.io.DataOutputStream;
import java.io.InputStream;
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

        List<Blob> blobs = new ArrayList<>();
        try {
            URL url = new URL(serverUrl+"/ai");

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            connection.setRequestMethod("POST");
            connection.setUseCaches(false);
            connection.setDoOutput(true);
            connection.setDoInput(true);
            //20231004 추가
            connection.setConnectTimeout(3600000);
            connection.setReadTimeout(3600000);
            //20231004 추가
            connection.setRequestProperty("Connection", "Keep-Alive");
            connection.setRequestProperty("Cache-Control", "no-cache");
            connection.setRequestProperty("Content-Type", "multipart/form-data;boundary=" + BOUNDARY);

            for (Voice voice : voices) {
                blobs.add(gcsService.getBlob(voice.getName()));
            }

            try (DataOutputStream dos = new DataOutputStream(connection.getOutputStream())) {

                // 문자열 파트 1 전송
                dos.writeBytes("--" + BOUNDARY + "\r\n");
                dos.writeBytes("Content-Disposition: form-data; name=\"roomUuid\"\r\n");
                //20231004 추가
                dos.writeBytes("Content-Type: text/plain; charset=UTF-8\r\n");
                dos.writeBytes("\r\n");
                dos.writeBytes(roomUuid + "\r\n");
                System.out.println("roomUuid = " + roomUuid);

                // 문자열 파트 2 전송
                dos.writeBytes("--" + BOUNDARY + "\r\n");
                dos.writeBytes("Content-Disposition: form-data; name=\"gender\"\r\n");
                //20231004 추가
                dos.writeBytes("Content-Type: text/plain; charset=UTF-8\r\n");
                dos.writeBytes("\r\n");
                dos.writeBytes(gender + "\r\n");
                System.out.println("gender = " + gender);

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
            System.out.println("responseCode = " + responseCode);
            if (responseCode == HttpURLConnection.HTTP_OK) {
                System.out.println("Files uploaded successfully!");
            } else {
                System.out.println("File upload failed with response code: " + responseCode);
            }
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

        if(congratulationList.size()>0) {
            for(MultipartFile file : congratulationList) {
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

        if(consolationList.size()>0) {
            for(MultipartFile file : consolationList) {
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

        if(encourageList.size()>0) {
            for(MultipartFile file : encourageList) {
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

        if(safetyList.size()>0) {
            for(MultipartFile file : safetyList) {
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

        if(thanksList.size()>0) {
            for(MultipartFile file : thanksList) {
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

        if(welcomeList.size()>0) {
            for(MultipartFile file : welcomeList) {
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

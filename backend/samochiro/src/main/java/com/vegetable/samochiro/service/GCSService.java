package com.vegetable.samochiro.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.vegetable.samochiro.domain.Voice;

import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
//@Transactional(readOnly = true)
//@RequiredArgsConstructor
public class GCSService {
    @Value("${spring.cloud.gcp.storage.bucket-name}")
    private String bucketName;
    @Value("${spring.cloud.gcp.storage.project-id}")
    private String projectId;
    @Value("${spring.cloud.gcp.storage.credentials.location}")
    private String location;

    public String uploadFile(String fileName, MultipartFile file) {
        try {
            String ext = file.getContentType(); // 파일의 형식 ex) JPG
            BlobInfo blobInfo = getStorage().create(
                    BlobInfo.newBuilder(bucketName, fileName)
                            .setContentType(ext)
                            .build(),
                    file.getInputStream()
            );
            return blobInfo.getMediaLink();
        } catch (Exception e) {
            // Handle the exception
            e.printStackTrace();
        }
        return null;
    }

    public void deleteFile(String voicemailName) {
        //버킷 명, 삭제 파일 이름, 프로젝트 ID
        getStorage().delete(bucketName, voicemailName, Storage.BlobSourceOption.decryptionKey(projectId));
    }

    public List<Blob> downloadFiles(List<Voice> voiceList) {
        List<Blob> blobList = new ArrayList<>();

        for (Voice v : voiceList) {
            String name = v.getName();
            Blob blob = getStorage().get(bucketName, name);
            blob.downloadTo(Paths.get(name.replaceAll(":", "_")));
            blobList.add(blob);

        }
        return blobList;
    }

    public Blob getBlob(String name) {
        return getStorage().get(bucketName, name);
    }

    private Storage getStorage() {
        ClassPathResource resource = new ClassPathResource(location);
        if (!resource.exists()) {
            log.error("Invalid filePath : {}", location);
            throw new IllegalArgumentException();
        }
        try {
            return StorageOptions.newBuilder()
                    .setProjectId(projectId)
                    .setCredentials(GoogleCredentials.fromStream(resource.getInputStream())).build()
                    .getService();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}

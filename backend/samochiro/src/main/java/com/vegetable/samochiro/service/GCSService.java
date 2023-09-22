package com.vegetable.samochiro.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.IOException;

@Service
//@Transactional(readOnly = true)
//@RequiredArgsConstructor
public class GCSService {
    @Value("${spring.cloud.gcp.storage.bucket-name}")
    private String bucketName;
    private Storage storage;

    public GCSService() {
        try{
            String rootPath = System.getProperty("user.dir");
            StorageOptions storageOptions = StorageOptions.newBuilder()
                    .setProjectId("avid-lock-397313")
                    .setCredentials(GoogleCredentials.fromStream(new FileInputStream(rootPath + "/src/main/resources/avid-lock-397313-6129fb95bb28.json"))).build();
            this.storage = storageOptions.getService();
        }
        catch (IOException e){
            e.printStackTrace();
        }
    }

    private void init(){

    }

    public String uploadFile(String fileName, MultipartFile file) {
        try {
            String ext = file.getContentType(); // 파일의 형식 ex) JPG
            BlobInfo blobInfo = storage.create(
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
}

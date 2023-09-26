package com.vegetable.samochiro.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.vegetable.samochiro.domain.Voice;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.IOException;

@Service
@Slf4j
//@Transactional(readOnly = true)
//@RequiredArgsConstructor
public class GCSService {
    @Value("${spring.cloud.gcp.storage.bucket-name}")
    private String bucketName;
    @Value("${spring.cloud.gcp.credentials.project-id}")
    private String projectId;
    private Storage storage;

    public GCSService() {
        try{
            String rootPath = System.getProperty("user.dir");
            log.info(rootPath);
            StorageOptions storageOptions = StorageOptions.newBuilder()
                .setProjectId(projectId)
                .setCredentials(GoogleCredentials.fromStream(new FileInputStream(rootPath))).build();
            this.storage = storageOptions.getService();
        }
        catch (IOException e){
            e.printStackTrace();
        }
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

    public void deleteFile(String voicemailName) {
        //버킷 명, 삭제 파일 이름, 프로젝트 ID
        storage.delete(bucketName, voicemailName, Storage.BlobSourceOption.decryptionKey(projectId));
    }

    public List<Blob> downloadFiles(List<Voice> voiceList) {
        List<Blob> blobList = new ArrayList<>();

        for(Voice v: voiceList) {
            String name = v.getName();
            Blob blob = storage.get(bucketName, name);
            blob.downloadTo(Paths.get(name.replaceAll(":","_")));
            blobList.add(blob);

        }
        return blobList;
    }

    public Blob getBlob(String name){
        return storage.get(BlobId.of(bucketName, name));
    }

}

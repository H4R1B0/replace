package com.vegetable.samochiro.service;

import com.vegetable.samochiro.domain.Photo;
import com.vegetable.samochiro.domain.Room;
import com.vegetable.samochiro.dto.photo.PhotoDetailResponse;
import com.vegetable.samochiro.dto.photo.PhotoListResponse;
import com.vegetable.samochiro.repository.PhotoRepository;
import com.vegetable.samochiro.repository.RoomRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PhotoService {

	private final PhotoRepository photoRepository;
	private final GCSService gcssService;
	private final RoomRepository roomRepository;

	@Transactional
	public void registerImageFile(String userId, int sequence, MultipartFile image) {
		String currentTime = LocalDateTime.now().toString();
		String fileName = currentTime + "ph" + image.getOriginalFilename();
		String url = gcssService.uploadFile(fileName, image);
		Room findRoom = roomRepository.findBySequenceAndUserId(sequence, userId).get();

		Photo photo = Photo.builder()
			.url(url)
			.name(fileName)
			.registDate(LocalDate.now())
			.room(findRoom)
			.build();

		photoRepository.save(photo);
	}
	//사진 등록 - 액자 1번

	public List<PhotoListResponse> findPhotoList(String userId, int sequence) {
		String roomUuid = roomRepository.findBySequenceAndUserId(sequence, userId).get().getUuid();
		List<Photo> photoList = photoRepository.findAllByRoomUuid(roomUuid);

		List<PhotoListResponse> responseList = new ArrayList<>();
		for(Photo p: photoList) {
			PhotoListResponse photoResponse = PhotoListResponse.builder()
				.id(p.getId())
				.url(p.getUrl())
				.registDate(p.getRegistDate())
				.build();

			responseList.add(photoResponse);
		}
		return responseList;
	}
	//사진 리스트 조회 - 엑자 2번

	public PhotoDetailResponse findPhotoDetail(Long id) {
		Photo findPhoto = photoRepository.findById(id).get();
		PhotoDetailResponse photoDetail = PhotoDetailResponse.builder()
			.id(findPhoto.getId())
			.url(findPhoto.getUrl())
			.registDate(findPhoto.getRegistDate())
			.build();
		return photoDetail;
	}
	//사진 상세 조회 - 액자 3번

	@Transactional
	public void DeletePhotoById(Long id) {
		String fileName = photoRepository.findById(id).get().getName();
		photoRepository.deleteById(id);
		gcssService.deleteFile(fileName);
	}
	//사진 삭제 조회 - 액자 4번

	@Transactional
    public void deletePhotosByRoomUuid(String roomUuid) {
		List<Photo> photos = photoRepository.findAllByRoomUuid(roomUuid);
		for (Photo photo : photos){
			gcssService.deleteFile(photo.getName());
			photoRepository.deleteById(photo.getId());
		}
    }
	//사진 삭제 - 방 2
	
}

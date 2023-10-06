package com.vegetable.samochiro.service;

import com.vegetable.samochiro.domain.Letter;
import com.vegetable.samochiro.domain.Room;
import com.vegetable.samochiro.domain.User;
import com.vegetable.samochiro.dto.letter.LetterDetailResponse;
import com.vegetable.samochiro.dto.letter.LetterListResponse;
import com.vegetable.samochiro.dto.letter.LetterSaveRequest;
import com.vegetable.samochiro.enums.CustomErrorType;
import com.vegetable.samochiro.exception.LetterNotFoundException;
import com.vegetable.samochiro.exception.RoomNotFoundException;
import com.vegetable.samochiro.exception.UserNotFoundException;
import com.vegetable.samochiro.repository.LetterRepository;
import com.vegetable.samochiro.repository.RoomRepository;
import com.vegetable.samochiro.repository.UserRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class LetterService {

	private final LetterRepository letterRepository;
	private final UserRepository userRepository;
	private final RoomRepository roomRepository;

	@Transactional
	public void saveLetter(LetterSaveRequest saveRequest, String userId) {
		Optional<User> findUser = userRepository.findById(userId);
		if(findUser.isEmpty()){
			throw new UserNotFoundException(CustomErrorType.USER_NOT_FOUND.getMessage());
		}

		Optional<Room> findRoom = roomRepository.findBySequenceAndUserId(saveRequest.getSequence(), userId);
		if(findRoom.isEmpty()){
			throw new RoomNotFoundException(CustomErrorType.ROOM_NOT_FOUND.getMessage());
		}

		Letter letter = Letter.builder()
				.title(saveRequest.getTitle())
				.content(saveRequest.getContent())
				.writeTime(LocalDateTime.now())
				.user(findUser.get())
				.room(findRoom.get())
				.build();

		letterRepository.save(letter);
	}
	//편지 등록 - 서재 1번

	public List<LetterListResponse> findLetterList(String userId, int sequence) {
		Optional<Room> findRoom = roomRepository.findBySequenceAndUserId(sequence, userId);
		if (findRoom.isEmpty()) {
			throw new RoomNotFoundException(CustomErrorType.ROOM_NOT_FOUND.getMessage());
		}

		String roomUuid = findRoom.get().getUuid();
		List<Letter> letterList = letterRepository.selectListByRoomUuid(roomUuid);
		List<LetterListResponse> letterListResponseList = new ArrayList<>();

		for (Letter l : letterList) {
			LetterListResponse letterListResponse = LetterListResponse.builder()
					.letterId(l.getLetterId())
					.title(l.getTitle())
					.writeTime(l.getWriteTime())
					.build();
			letterListResponseList.add(letterListResponse);
		}
		return letterListResponseList;
	}
	//편지 리스트 조회 - 서재 2번

	public LetterDetailResponse findLetterDetail(Long letterId) {
		Optional<Letter> letter = letterRepository.findById(letterId);
		if (letter.isEmpty()) {
			throw new LetterNotFoundException(CustomErrorType.LETTER_NOT_FOUND.getMessage());
		}

		return LetterDetailResponse.builder()
				.letterId(letter.get().getLetterId())
				.title(letter.get().getTitle())
				.content(letter.get().getContent())
				.writeTime(letter.get().getWriteTime())
				.build();
	}
	//편지 상세 조회 - 서재 3번

	@Transactional
	public void deleteLetter(Long letterId) {
		letterRepository.deleteById(letterId);
	}
	//편지 삭제 - 서재 4번

	@Transactional
	public void deleteLetterByRoomUuid(String roomUuid) {
		letterRepository.deleteByRoomUuid(roomUuid);
	}
	//편지 삭제 - 방 2

}

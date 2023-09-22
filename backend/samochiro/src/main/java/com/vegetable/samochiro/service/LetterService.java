package com.vegetable.samochiro.service;

import com.vegetable.samochiro.domain.Letter;
import com.vegetable.samochiro.dto.letter.LetterDetailResponse;
import com.vegetable.samochiro.dto.letter.LetterListResponse;
import com.vegetable.samochiro.dto.letter.LetterSaveRequest;
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
		Letter letter = Letter.builder()
			.title(saveRequest.getTitle())
			.content(saveRequest.getContent())
			.writeTime(LocalDateTime.now())
			.user(userRepository.findById(userId).get())
			.room(roomRepository.findByRoomSequenceUserId(saveRequest.getSequence(), userId).get())
			.build();

		letterRepository.save(letter);
	}
	//편지 등록 - 서재 1번

	public List<LetterListResponse> findLetterList(String roomUuid) {
		List<Letter> letterList = letterRepository.selectListByRoomUuid(roomUuid).get();
		List<LetterListResponse> letterListResponseList = new ArrayList<>();

		for(Letter l: letterList) {
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
		LetterDetailResponse letterDetail = LetterDetailResponse.builder()
			.letterId(letter.get().getLetterId())
			.title(letter.get().getTitle())
			.content(letter.get().getContent())
			.writeTime(letter.get().getWriteTime())
			.build();
		return letterDetail;
	}
	//편지 상세 조회 - 서재 3번

	@Transactional
	public void deleteLetter(Long letterId) {
		letterRepository.deleteById(letterId);
	}
	//편지 삭제 - 서재 4번
	
}

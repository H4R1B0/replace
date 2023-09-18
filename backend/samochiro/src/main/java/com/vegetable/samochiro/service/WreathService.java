package com.vegetable.samochiro.service;

import com.vegetable.samochiro.domain.Declaration;
import com.vegetable.samochiro.domain.User;
import com.vegetable.samochiro.domain.Wreath;
import com.vegetable.samochiro.domain.WreathCount;
import com.vegetable.samochiro.domain.WreathUser;
import com.vegetable.samochiro.dto.wreath.DeclarationSaveRequest;
import com.vegetable.samochiro.dto.wreath.WreathDetailResponse;
import com.vegetable.samochiro.dto.wreath.WreathListResponse;
import com.vegetable.samochiro.dto.wreath.WreathSaveRequest;
import com.vegetable.samochiro.dto.wreath.WreathUpdateRequest;
import com.vegetable.samochiro.repository.DeclarationRepository;
import com.vegetable.samochiro.repository.UserRepository;
import com.vegetable.samochiro.repository.WreathCountRepository;
import com.vegetable.samochiro.repository.WreathRepository;
import com.vegetable.samochiro.repository.WreathUserRepository;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class WreathService {

	private final WreathRepository wreathRepository;
	private final UserRepository userRepository;
	private final WreathCountRepository wreathCountRepository;
	private final WreathUserRepository wreathUserRepository;
	private final DeclarationRepository declarationRepository;

	@Transactional
	public void saveWreath(WreathSaveRequest saveRequest) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate startDate = LocalDate.parse(saveRequest.getStartDate(), formatter);
		LocalDate endDate = LocalDate.parse(saveRequest.getEndDate(), formatter);

		WreathCount wreathCount = new WreathCount();

		Wreath wreath = Wreath.builder()
			.title(saveRequest.getTitle())
			.subTitle(saveRequest.getSubTitle())
			.description(saveRequest.getDescription())
			.startDate(startDate)
			.endDate(endDate)
			.user(userRepository.findById(saveRequest.getUserId()).get())
			.build();

		wreath.addWreathCount(wreathCount);
		wreathRepository.save(wreath);
	}
	//헌화 등록 - 헌화 1번

	public List<WreathListResponse> findWreathList() {
		List<Wreath> wreathList = wreathRepository.findAll();
		List<WreathListResponse> wreathListResponseList = new ArrayList<>();

		for(Wreath w: wreathList) {
			WreathListResponse wreathResponse = WreathListResponse.builder()
				.wreathId(w.getWreathId())
				.title(w.getTitle())
				.subTitle(w.getSubTitle())
				.startDate(w.getStartDate())
				.endDate(w.getEndDate())
				.flower(w.getWreathCount().getFlower())
				.candle(w.getWreathCount().getCandle())
				.ribbon(w.getWreathCount().getRibbon())
				.build();
			wreathListResponseList.add(wreathResponse);
		}

		return wreathListResponseList;
	}
	//헌화 전체 리스트 조회 - 헌화 2번

	public WreathDetailResponse findWreathDetail(Long wreathId) {
		Optional<Wreath> wreath = wreathRepository.findById(wreathId);
		WreathDetailResponse wreathDetail = WreathDetailResponse.builder()
			.wreathId(wreath.get().getWreathId())
			.title(wreath.get().getTitle())
			.subTitle(wreath.get().getSubTitle())
			.description(wreath.get().getDescription())
			.startDate(wreath.get().getStartDate())
			.endDate(wreath.get().getEndDate())
			.flower(wreath.get().getWreathCount().getFlower())
			.candle(wreath.get().getWreathCount().getCandle())
			.candle(wreath.get().getWreathCount().getRibbon())
			.build();

		return wreathDetail;
	}
	//헌화 상세 조회 - 헌화 3번

	public List<WreathListResponse> findTitleWreathList(String title) {
		Optional<List<Wreath>> findWreathList = wreathRepository.selectByTitle(title);
		List<WreathListResponse> wreathListResponseList = new ArrayList<>();

		for(Wreath w: findWreathList.get()) {
			WreathListResponse wreathResponse = WreathListResponse.builder()
				.wreathId(w.getWreathId())
				.title(w.getTitle())
				.subTitle(w.getSubTitle())
				.startDate(w.getStartDate())
				.endDate(w.getEndDate())
				.flower(w.getWreathCount().getFlower())
				.candle(w.getWreathCount().getCandle())
				.ribbon(w.getWreathCount().getRibbon())
				.build();
			wreathListResponseList.add(wreathResponse);
		}
		return wreathListResponseList;
	}
	//헌화 제목 검색 - 헌화 4번

	@Transactional
	public boolean updateWreath(WreathUpdateRequest updateRequest) {
		Optional<WreathUser> checkUser = wreathUserRepository.selectWreathUser(
			updateRequest.getWreathId(), updateRequest.getUserId());

		if(checkUser.isPresent()) { //이미 헌화한 사용자라면
			return false;
		}
		else { //아직 헌화하지 않은 사용자라면
			Optional<WreathCount> wreathCount = wreathCountRepository.selectWreathCount(updateRequest.getWreathId());
			if(updateRequest.getWreathItem().equals("flower")) { //헌화 아이템이 꽃일 경우
				wreathCount.get().setFlower(wreathCount.get().getFlower()+1);
			}
			else if(updateRequest.getWreathItem().equals("candle")) { //헌화 아이템이 초일 경우
				wreathCount.get().setCandle(wreathCount.get().getCandle()+1);
			}
			else if(updateRequest.getWreathItem().equals("ribbon")) { //헌화 아이템이 리본일 경우
				wreathCount.get().setRibbon(wreathCount.get().getRibbon()+1);
			}
			wreathCountRepository.save(wreathCount.get()); //헌화 카운트 업데이트

			WreathUser wreathUser = WreathUser.builder()
				.wreath(wreathRepository.findById(updateRequest.getWreathId()).get())
				.user(userRepository.findById(updateRequest.getUserId()).get())
				.build();
			wreathUserRepository.save(wreathUser); //헌화한 사용자 생성해서 저장

			return true;
		}
	}
	//헌화하기 - 헌화 5번

	@Transactional
	public void saveDeclaration(DeclarationSaveRequest saveRequest) {
		Optional<Wreath> wreath = wreathRepository.findById(saveRequest.getWreathId());
		wreath.get().setDeclarationCount(wreath.get().getDeclarationCount()+1); //신고 수 +1

		String type = "";
		if(saveRequest.getDeclarationType()==1) {
			type = "스팸/도배글";
		}
		else if(saveRequest.getDeclarationType()==2) {
			type = "잘못된 정보 포함";
		}
		else if(saveRequest.getDeclarationType()==3) {
			type = "개인 정보 포함";
		}
		else if(saveRequest.getDeclarationType()==4) {
			type = "욕설/생명경시";
		}
		else if(saveRequest.getDeclarationType()==5) {
			type = "혐오/차별적";
		}

		Declaration declaration = Declaration.builder()
			.declarationType(type)
			.declarationContent(saveRequest.getDeclarationContent())
			.wreath(wreath.get())
			.user(userRepository.findById(saveRequest.getUserId()).get())
			.build();

		declarationRepository.save(declaration);
	}
	//신고 등록 - 헌화 6번

}

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
import com.vegetable.samochiro.util.CrawlingUtils;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
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
	private final CrawlingUtils crawlingUtils;

	@Transactional
	public void saveWreath(WreathSaveRequest saveRequest, String userId) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate startDate = LocalDate.parse(saveRequest.getStartDate(), formatter);
		LocalDate endDate = LocalDate.parse(saveRequest.getEndDate(), formatter);

		saveRequest.getDescription();



		WreathCount wreathCount = new WreathCount();

		Wreath wreath = Wreath.builder()
			.title(saveRequest.getTitle())
			.subTitle(saveRequest.getSubTitle())
			.description(saveRequest.getDescription())
			.startDate(startDate)
			.endDate(endDate)
			.user(userRepository.findById(userId).get())
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
				.allCount(w.getWreathCount().getFlower()+w.getWreathCount().getCandle()+w.getWreathCount().getRibbon())
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
	public boolean updateWreath(WreathUpdateRequest updateRequest, String userId) {
		Optional<WreathUser> checkUser = wreathUserRepository.selectWreathUser(
			updateRequest.getWreathId(), userId);

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
				.user(userRepository.findById(userId).get())
				.build();
			wreathUserRepository.save(wreathUser); //헌화한 사용자 생성해서 저장

			return true;
		}
	}
	//헌화하기 - 헌화 5번

	@Transactional
	public void saveDeclaration(DeclarationSaveRequest saveRequest, String userId) {
		Optional<Wreath> wreath = wreathRepository.findById(saveRequest.getWreathId());
		int newCount = wreath.get().getDeclarationCount()+1; //신고 수 +1

		if(newCount >= 1) { //신고 수가 10개가 넘으면
			boolean flag = false;
			//해당 헌화 내용 알고리즘 돌리기
			List<String> badWordList = crawlingUtils.getBadWordList();
			for(String word : badWordList) {
				if(kmpSearch(wreath.get().getDescription(), word)) { //욕설, 비하, 모욕이 있으면
					declarationRepository.deleteByWreathId(wreath.get().getWreathId()); //해당 헌화 신고 삭제
//					wreathCountRepository.deleteByWreathId(wreath.get().getWreathId()); //헌화 카운트 삭제
					wreathUserRepository.deleteByWreathId(wreath.get().getWreathId()); //헌화한 사용자 삭제
					wreathRepository.deleteById(wreath.get().getWreathId()); //해당 헌화 삭제
					flag = true;
					break;
				}
			}
			if(!flag) { //욕설, 비하, 모욕이 없으면
				wreath.get().setDeclarationCount(newCount);

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
					.user(userRepository.findById(userId).get())
					.build();

				declarationRepository.save(declaration);
			}
		}

		else {
			wreath.get().setDeclarationCount(newCount);

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
				.user(userRepository.findById(userId).get())
				.build();

			declarationRepository.save(declaration);
		}
	}
	//신고 등록 - 헌화 6번

	public int[] computeFailureFunction(String badWord) {
		int m = badWord.length();
		int[] failure = new int[m];
		int j = 0;

		for (int i = 1; i < m; i++) {
			while (j > 0 && badWord.charAt(j) != badWord.charAt(i)) {
				j = failure[j - 1];
			}
			if (badWord.charAt(j) == badWord.charAt(i)) {
				j++;
			}
			failure[i] = j;
		}
		return failure;
	}
	//kmp 알고리즘용 실패 함수 메소드

	public boolean kmpSearch(String text, String pattern) {
		int[] failure = computeFailureFunction(pattern);
		int i = 0, j = 0;
		int n = text.length();
		int m = pattern.length();

		while (i < n) {
			if (pattern.charAt(j) == text.charAt(i)) {
				if (j == m - 1) {
					return true; // Pattern found
				}
				i++;
				j++;
			} else {
				if (j != 0) {
					j = failure[j - 1];
				} else {
					i++;
				}
			}
		}
		return false; // Pattern not found
	}
	//kmp 알고리즘


	public void checkDeclaration(String userId, String wreathId) {
		List<String> badWordList = crawlingUtils.getBadWordList();


	}
	//헌화 내용 판별

}

package com.vegetable.samochiro.service;

import com.vegetable.samochiro.domain.Declaration;
import com.vegetable.samochiro.domain.Wreath;
import com.vegetable.samochiro.domain.WreathCount;
import com.vegetable.samochiro.domain.WreathUser;
import com.vegetable.samochiro.dto.wreath.DeclarationSaveRequest;
import com.vegetable.samochiro.dto.wreath.WreathDetailResponse;
import com.vegetable.samochiro.dto.wreath.WreathListResponse;
import com.vegetable.samochiro.dto.wreath.WreathSaveRequest;
import com.vegetable.samochiro.dto.wreath.WreathUpdateRequest;
import com.vegetable.samochiro.enums.CustomErrorType;
import com.vegetable.samochiro.exception.BlankException;
import com.vegetable.samochiro.repository.DeclarationRepository;
import com.vegetable.samochiro.repository.UserRepository;
import com.vegetable.samochiro.repository.WreathCountRepository;
import com.vegetable.samochiro.repository.WreathRepository;
import com.vegetable.samochiro.repository.WreathUserRepository;
import com.vegetable.samochiro.util.CrawlingUtils;
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
	private final GCSService gcsService;

	private final int DECLARATION_COUNT = 5;

	@Transactional
	public boolean saveWreath(WreathSaveRequest saveRequest, String userId) {

		//헌화 내용 확인
		boolean isNegative = false;
		List<String> badWordList = crawlingUtils.getBadWordList();
		String title = saveRequest.getTitle();
		String subTitle = saveRequest.getSubTitle();
		String content = saveRequest.getDescription();
		for(String w: badWordList) {
			if(kmpSearch(title, w) || kmpSearch(subTitle, w) || kmpSearch(content, w)) { //부정적인 내용이 있으면
				return false;
			}
		}

		if(title.isEmpty() || subTitle.isEmpty() || content.isEmpty()){
			throw new BlankException(CustomErrorType.CONTENT_BLANK.getMessage());
		}

		if(!isNegative) { //부정적인 내용이 없으면
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
				.user(userRepository.findById(userId).get())
				.build();

			wreath.addWreathCount(wreathCount);
			wreathRepository.save(wreath);
		}
		return true;
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
			.ribbon(wreath.get().getWreathCount().getRibbon())
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
	public boolean saveDeclaration(DeclarationSaveRequest saveRequest, String userId) {
		Optional<Wreath> wreath = wreathRepository.findById(saveRequest.getWreathId());
		int newCount = wreath.get().getDeclarationCount() + 1; //신고 수 +1

		Optional<Declaration> selectedByWreathUserId = declarationRepository.selectByWreathUserId(
			saveRequest.getWreathId(), userId);
		if (selectedByWreathUserId.isPresent()) { //이미 한 신고라면
			return true;
		} else {
			//신고 수가 특정 수 넘으면
			if (newCount >= DECLARATION_COUNT) {
				//구글 텍스트 감정 API
				String content = saveRequest.getDeclarationContent();
				boolean isNegative = gcsService.isNegative(content);

				//부정적인 경우
				if (isNegative) {
					declarationRepository.deleteByWreathId(wreath.get().getWreathId()); //해당 헌화 신고 삭제
					wreathUserRepository.deleteByUserIdAndWreathId(userId, wreath.get().getWreathId()); //헌화한 사용자 삭제
					wreathRepository.deleteById(wreath.get().getWreathId()); //해당 헌화 삭제
				}

				String type = getDeclarationType(saveRequest.getDeclarationType());

				wreath.get().setDeclarationCount(newCount);
				Declaration declaration = Declaration.builder()
					.declarationType(type)
					.declarationContent(saveRequest.getDeclarationContent())
					.wreath(wreath.get())
					.user(userRepository.findById(userId).get())
					.build();
				declarationRepository.save(declaration);
			}
		}
		return false;
	}
	//신고 등록 - 헌화 6번

	private String getDeclarationType(int num) {
		if (num == 1) {
			return "스팸/도배글";
		}
		if (num == 2) {
			return "잘못된 정보 포함";
		}
		if (num == 3) {
			return "개인 정보 포함";
		}
		if (num == 4) {
			return "욕설/생명경시";
		}
		if (num == 5) {
			return "혐오/차별적";
		}
		return "기타";
	}

	public List<WreathListResponse> findWreathListByUserId(String userId) {
		List<Wreath> wreathList = wreathRepository.selectByUserId(userId);
		List<WreathListResponse> responseList = new ArrayList<>();

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
			responseList.add(wreathResponse);
		}
		return responseList;
	}
	//내가 작성한 헌화 조회 - 헌화 7번

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

	@Transactional
    public void deleteWreathByUserId(String userId) {
		List<Wreath> wreaths = wreathRepository.selectByUserId(userId);
		for(Wreath wreath : wreaths){
			wreathUserRepository.deleteByUserIdAndWreathId(userId, wreath.getWreathId());
//			wreathCountRepository.deleteByWreathId(wreath.getWreathId());
			wreathRepository.delete(wreath);
		}
    }
    //사용자 아이디로 헌화 삭제 - 유저 8

}

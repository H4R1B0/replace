package com.vegetable.samochiro.service;

import com.vegetable.samochiro.repository.DeclarationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DeclarationService {

	private final DeclarationRepository declarationRepository;

	@Transactional
	public void deleteDeclarationByUserId(String userId) {
		declarationRepository.deleteDeclarationByUserId(userId);
	}
	//신고 삭제- 유저 8
}

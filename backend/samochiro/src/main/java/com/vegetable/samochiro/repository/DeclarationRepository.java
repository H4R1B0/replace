package com.vegetable.samochiro.repository;

import com.vegetable.samochiro.domain.Declaration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DeclarationRepository extends JpaRepository<Declaration, Long> {

	@Modifying
	@Query("delete from Declaration d where d.wreath.wreathId = :wreathId")
	void deleteByWreathId(@Param("wreathId") Long WreathId);
	//헌화 id로 신고 테이블 삭제

	@Modifying
	@Query("delete from Declaration d where d.user.id=:userId")
	void deleteDeclarationByUserId(String userId);
	//사용자 아이디로 신고 삭제
	
}

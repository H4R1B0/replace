package com.vegetable.samochiro.repository;

import com.vegetable.samochiro.domain.Declaration;
import java.util.Optional;
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
	void deleteDeclarationByUserId(@Param("userId") String userId);
	//사용자 아이디로 신고 삭제

	@Query("select d from Declaration d where d.wreath.wreathId=:wreathId and d.user.id=:userId")
	Optional<Declaration> selectByWreathUserId(@Param("wreathId") Long WreathId, @Param("userId") String userId);
	//userId와 wreathId로 신고 테이블 조회해서 해당 헌화에 해당유저가 신고를 했는지 안했는지 조회

}

package com.vegetable.samochiro.repository;

import com.vegetable.samochiro.domain.WreathCount;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface WreathCountRepository extends JpaRepository<WreathCount, Long> {

	@Query("select wc from WreathCount wc where wc.wreath.wreathId = :wreathId")
	Optional<WreathCount> selectWreathCount(@Param("wreathId") Long wreathId);
	//헌화 카운트 테이블 조회

    @Modifying
	@Query("delete from WreathCount wc where wc.wreath.wreathId=:wreathId")
	void deleteByWreathId(Long wreathId);
    //헌화 아이디로 헌화 카운트 삭제

//	@Modifying
//	@Query("delete from WreathCount wc where wc.wreath.wreathId = :wreathId")
//	void deleteByWreathId(@Param("wreathId") Long wreathId);
//	//헌화 id로 헌화 카운트 테이블 삭제

}

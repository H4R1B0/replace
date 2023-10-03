package com.vegetable.samochiro.repository;

import com.vegetable.samochiro.domain.WreathUser;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface WreathUserRepository extends JpaRepository<WreathUser, Long> {

	@Query("select wu from WreathUser wu where wu.wreath.wreathId = :wreathId and wu.user.id = :userId")
	Optional<WreathUser> selectWreathUser(@Param("wreathId") Long wreathId, @Param("userId") String userId);
	//헌화한 사용자인지 조회

	@Modifying
	@Query("delete from WreathUser wu where wu.wreath.wreathId = :wreathId")
	void deleteByWreathId(@Param("wreathId") Long WreathId);
	//헌화 id로 헌화한 사용자 테이블 삭제
	
}

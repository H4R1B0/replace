package com.vegetable.samochiro.repository;

import com.vegetable.samochiro.domain.Alarm;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {

	@Query("select a from Alarm a where a.user.id = :userId")
	Optional<List<Alarm>> findAllByUserId(@Param("userId") String userId);
	//사용자 별 알람 리스트 조회

	@Modifying
	@Query("delete from Alarm a where a.user.id=:userId")
	void deleteByUserId(String userId);
	//사용자 아이디로 알림 삭제
	
}

package com.vegetable.samochiro.repository;

import com.vegetable.samochiro.domain.Letter;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LetterRepository extends JpaRepository<Letter, Long> {

	@Query("select l from Letter l where l.room.uuid = :roomUUid")
	Optional<List<Letter>> selectListByRoomUuid(@Param("roomUUid") String roomUUid);
	//방별 편지리스트 검색

	@Modifying
	@Query("delete from Letter l  where l.room.uuid=:roomUuid")
	void deleteByRoomUuid(String roomUuid);
	//room uuid로 편지 삭제

}

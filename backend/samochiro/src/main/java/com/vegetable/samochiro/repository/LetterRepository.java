package com.vegetable.samochiro.repository;

import com.vegetable.samochiro.domain.Letter;
import com.vegetable.samochiro.domain.Wreath;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LetterRepository extends JpaRepository<Letter, Long> {

	@Query("select l from Letter l where l.room.uuid = :roomUUid")
	Optional<List<Letter>> selectListByRoomUuid(@Param("roomUUid") String roomUUid);
	//방별 편지리스트 검색

//	@Query("select l from Letter l where l.room.roomUuid = :roomUuid and l.letterId = :letterId")
//	Optional<Letter> selectByRoomUuidAndLetterId(@Param("roomUuid") String roomUuid, @Param("letterId") Long letterId);

}

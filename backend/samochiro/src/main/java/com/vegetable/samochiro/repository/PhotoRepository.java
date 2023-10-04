package com.vegetable.samochiro.repository;

import com.vegetable.samochiro.domain.Photo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PhotoRepository extends JpaRepository<Photo, Long> {

	@Query("select p from Photo p where p.room.uuid = :roomUuid order by p.registDate desc")
	List<Photo> findAllByRoomUuid(String roomUuid);
	//방 uuid로 사진 리스트 조회

}

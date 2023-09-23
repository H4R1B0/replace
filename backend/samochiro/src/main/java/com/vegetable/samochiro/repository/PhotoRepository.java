package com.vegetable.samochiro.repository;

import com.vegetable.samochiro.domain.Photo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

public interface PhotoRepository extends JpaRepository<Photo, Long> {

	@Query("select p from Photo p where p.room.uuid = :roomId")
	List<Photo> findAllByRoomId(@Param("roomId") String roomId);
	//방 uuid로 사진 리스트 조회

}

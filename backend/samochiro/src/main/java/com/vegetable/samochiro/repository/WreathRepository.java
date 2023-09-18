package com.vegetable.samochiro.repository;

import com.vegetable.samochiro.domain.User;
import com.vegetable.samochiro.domain.Wreath;
import com.vegetable.samochiro.domain.WreathCount;
import com.vegetable.samochiro.domain.WreathUser;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface WreathRepository extends JpaRepository<Wreath, Long> {

	@Query("select w from Wreath w where w.title like %:title%")
	Optional<List<Wreath>> selectByTitle(@Param("title") String title);
	//헌화 검색


}

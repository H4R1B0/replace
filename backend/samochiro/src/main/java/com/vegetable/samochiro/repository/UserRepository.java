package com.vegetable.samochiro.repository;

import com.vegetable.samochiro.domain.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, String> {
	@Query("select u from User u where u.nickname = :nickname")
	Optional<User> findByNickname(@Param("nickname") String nickname);
	//닉네임 중복 검사, 닉네임 검색



}

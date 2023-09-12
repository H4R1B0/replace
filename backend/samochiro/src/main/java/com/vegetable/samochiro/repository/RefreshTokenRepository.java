package com.vegetable.samochiro.repository;

import com.vegetable.samochiro.dto.Token;
import org.springframework.data.repository.CrudRepository;

public interface RefreshTokenRepository extends CrudRepository<Token, String> {
}
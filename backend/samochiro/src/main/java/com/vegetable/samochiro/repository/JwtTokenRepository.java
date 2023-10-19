package com.vegetable.samochiro.repository;

import com.vegetable.samochiro.oauth2.token.JwtToken;
import org.springframework.data.repository.CrudRepository;

public interface JwtTokenRepository extends CrudRepository<JwtToken, String> {
}
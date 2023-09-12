package com.vegetable.samochiro.service;

import com.vegetable.samochiro.dto.Token;
import com.vegetable.samochiro.repository.RefreshTokenRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
//@Transactional
public class TokenService {
    private final RefreshTokenRepository refreshTokenRepository;

    public Optional<Token> refreshToken(String accessToken) {
        return refreshTokenRepository.findById(accessToken);
    }
}

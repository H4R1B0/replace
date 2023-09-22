package com.vegetable.samochiro.oauth2.token;

import com.vegetable.samochiro.repository.JwtTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class JwtTokenService {

    private final String AUTHENTICATION_PREFIX;

    private final JwtTokenRepository jwtTokenRepository;

    public JwtTokenService(@Value("${spring.jwt.prefix}") String AUTHENTICATION_PREFIX, JwtTokenRepository jwtTokenRepository) {
        this.AUTHENTICATION_PREFIX = AUTHENTICATION_PREFIX;
        this.jwtTokenRepository = jwtTokenRepository;
    }

    public String findUserId(String accessToken) {
        Optional<JwtToken> jwtToken = jwtTokenRepository.findById(accessToken);
        return jwtToken.get().getUserId();
    }

    public void deleteJwtToken(String accessToken) {
        jwtTokenRepository.deleteById(accessToken);
    }

    public void saveJwtToken(String accessToken, String userId) {
        JwtToken jwtToken = JwtToken.builder()
                .grantType(AUTHENTICATION_PREFIX)
                .accessToken(accessToken)
                .userId(userId)
                .build();
        jwtTokenRepository.save(jwtToken);
    }
}

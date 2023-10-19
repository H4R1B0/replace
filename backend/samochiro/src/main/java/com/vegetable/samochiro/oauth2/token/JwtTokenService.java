package com.vegetable.samochiro.oauth2.token;

import com.vegetable.samochiro.enums.CustomErrorType;
import com.vegetable.samochiro.exception.UserNotFoundException;
import com.vegetable.samochiro.repository.JwtTokenRepository;
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
        JwtToken jwtToken = findJwtToken(accessToken);
        return jwtToken.getUserId();
    }

    public void deleteJwtToken(String accessToken) {
        JwtToken jwtToken = findJwtToken(accessToken);
        jwtTokenRepository.delete(jwtToken);
    }

    private JwtToken findJwtToken(String accessToken) {
        Optional<JwtToken> jwtToken = jwtTokenRepository.findById(accessToken);
        if (jwtToken.isEmpty())
            throw new UserNotFoundException(CustomErrorType.USER_NOT_FOUND.getMessage());
        return jwtToken.get();
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

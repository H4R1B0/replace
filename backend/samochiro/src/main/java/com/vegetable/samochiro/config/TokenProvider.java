package com.vegetable.samochiro.config;

import com.vegetable.samochiro.dto.Token;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class TokenProvider {
    private final String SECRET_KEY;
    private final String AUTHENTICATION_PREFIX;
    private final String AUTHORITIES_KEY = "auth";
    private final long ACCESS_TOKEN_EXPIRATION_TIME;

    private final long TEST_ACCESS_TOKEN_EXPIRATION_TIME;
    private final long REFRESH_TOKEN_EXPIRATION_TIME;
    private Key signKey = null;

    public TokenProvider(
            @Value("${spring.jwt.prefix}") String authenticationPrefix,
            @Value("${spring.jwt.secret}") String secretKey,
            @Value("${spring.jwt.token.access-expiration-time}") long accessExpirationTime,
            @Value("${spring.jwt.token.test-access-expiration-time}") long testAccessExpirationTime,
            @Value("${spring.jwt.token.refresh-expiration-time}") long refreshExpirationTime
    ) {
        this.AUTHENTICATION_PREFIX = authenticationPrefix;
        this.SECRET_KEY = secretKey;
        this.ACCESS_TOKEN_EXPIRATION_TIME = accessExpirationTime;
        this.TEST_ACCESS_TOKEN_EXPIRATION_TIME = testAccessExpirationTime;
        this.REFRESH_TOKEN_EXPIRATION_TIME = refreshExpirationTime;
    }

    public Key getSignKey() {
        log.debug("SECRET_KEY = " + SECRET_KEY);
        if (this.signKey == null) {
            byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
            this.signKey = Keys.hmacShaKeyFor(keyBytes);
        }
        return this.signKey;
    }

    public Token generateToken(Authentication authentication) {
        log.debug("authentication = " + authentication);
        log.debug("토큰 생성");
        // 권한들 가져오기
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        log.debug("authorities = " + authorities);

        long now = (new Date()).getTime();
        log.debug("now = " + now);
        // Access Token 생성
        Date accessTokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRATION_TIME);
        log.debug("accessTokenExpiresIn = " + accessTokenExpiresIn);
        String accessToken = createAccessToken(authentication.getName(), authorities, accessTokenExpiresIn);
        log.debug("123123");
//        log.debug("accessToken = " + accessToken);
        // Refresh Token 생성
        String refreshToken = Jwts.builder()
                .setExpiration(new Date(now + REFRESH_TOKEN_EXPIRATION_TIME))
                .signWith(getSignKey(), SignatureAlgorithm.HS512)
                .compact();

        return Token.builder()
                .type(AUTHENTICATION_PREFIX)
                .accessToken(accessToken)
//                .accessTokenExpired(accessTokenExpiresIn.getTime())
                .refreshToken(refreshToken)
                .build();
    }

    public Token regenerateToken(Authentication authentication, Token token) {
        // 권한들 가져오기
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = (new Date()).getTime();
        Date accessTokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRATION_TIME);
        String accessToken = createAccessToken(authentication.getName(), authorities, accessTokenExpiresIn);

        return Token.builder()
                .type(AUTHENTICATION_PREFIX)
                .accessToken(accessToken)
                .refreshToken(token.getRefreshToken())
                .build();
    }

    public Token testGenerateToken(Authentication authentication) {
        log.debug("authentication = " + authentication);
        log.debug("토큰 생성");
        // 권한들 가져오기
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        log.debug("authorities = " + authorities);

        long now = (new Date()).getTime();
        log.debug("now = " + now);
        // Access Token 생성
        Date accessTokenExpiresIn = new Date(now + TEST_ACCESS_TOKEN_EXPIRATION_TIME);
        log.debug("accessTokenExpiresIn = " + accessTokenExpiresIn);
        String accessToken = createAccessToken(authentication.getName(), authorities, accessTokenExpiresIn);
        log.debug("123123");
//        log.debug("accessToken = " + accessToken);
        // Refresh Token 생성
        String refreshToken = Jwts.builder()
                .setExpiration(new Date(now + REFRESH_TOKEN_EXPIRATION_TIME))
                .signWith(getSignKey(), SignatureAlgorithm.HS512)
                .compact();

        return Token.builder()
                .type(AUTHENTICATION_PREFIX)
                .accessToken(accessToken)
//                .accessTokenExpired(accessTokenExpiresIn.getTime())
                .refreshToken(refreshToken)
                .build();
    }

    public Token testRegenerateToken(Authentication authentication, Token token) {
        // 권한들 가져오기
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = (new Date()).getTime();
        Date accessTokenExpiresIn = new Date(now + TEST_ACCESS_TOKEN_EXPIRATION_TIME);
        String accessToken = createAccessToken(authentication.getName(), authorities, accessTokenExpiresIn);

        return Token.builder()
                .type(AUTHENTICATION_PREFIX)
                .accessToken(accessToken)
                .refreshToken(token.getRefreshToken())
                .build();
    }

    public String createAccessToken(String userUuid, String authorities, Date accessTokenExpiresIn) {
        log.debug("userUuid = " + userUuid);
        log.debug("authorities = " + authorities);
        log.debug("accessTokenExpiresIn = " + accessTokenExpiresIn);
        log.debug("getSignKey() = " + getSignKey());
        return Jwts.builder()
                .setSubject(userUuid)       // payload "sub": "name"
                .claim(AUTHORITIES_KEY, authorities)        // payload "auth": "ROLE_USER"
                .setExpiration(accessTokenExpiresIn)        // payload "exp": 1516239022 (예시)
                .signWith(getSignKey(), SignatureAlgorithm.HS512)    // header "alg": "HS512"
                .compact();
    }

    public Authentication getAuthentication(String accessToken) {
        // 토큰 복호화
        Claims claims = parseClaims(accessToken);

        if (claims.get(AUTHORITIES_KEY) == null) {
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        // 클레임에서 권한 정보 가져오기
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        // UserDetails 객체를 만들어서 Authentication 리턴
        UserDetails principal = new User(claims.getSubject(), "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.warn("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            log.warn("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            log.warn("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            log.warn("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }

    public Claims parseClaims(String token) {
        try {
            return Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}

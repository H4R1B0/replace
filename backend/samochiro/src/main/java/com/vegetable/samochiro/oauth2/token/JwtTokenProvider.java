package com.vegetable.samochiro.oauth2.token;

import com.vegetable.samochiro.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import jakarta.xml.bind.DatatypeConverter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@Component
public class JwtTokenProvider {

    private final String AUTHENTICATION_PREFIX;

    private final long ACCESS_TOKEN_EXPIRATION_TIME;

    private final Key key;
    private final UserRepository userRepository;

    public JwtTokenProvider(
            @Value("${spring.jwt.secret}") String secretKey,
            @Value("${spring.jwt.prefix}") String authenticationPrefix,
            @Value("${spring.jwt.token.access-expiration-time}") long accessExpirationTime,
            UserRepository userRepository
    ) {
        byte[] secretByteKey = DatatypeConverter.parseBase64Binary(secretKey);
        this.key = Keys.hmacShaKeyFor(secretByteKey);
        this.AUTHENTICATION_PREFIX = authenticationPrefix;
        this.ACCESS_TOKEN_EXPIRATION_TIME = accessExpirationTime;
        this.userRepository = userRepository;
    }

    public JwtToken generateToken(Authentication authentication) {
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        DefaultOAuth2User defaultOAuth2User = (DefaultOAuth2User) authentication.getPrincipal();
        String userId = defaultOAuth2User.getName();
        String nickname = userRepository.findNicknameByUserId(userId).get();

        //accessToken 생성
        String accessToken = Jwts.builder()
                .setSubject(nickname)
                .claim("auth", authorities)
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

        //JwtToken 생성
        return JwtToken.builder()
                .grantType(AUTHENTICATION_PREFIX)
                .accessToken(accessToken)
                .userId(userId)
                .build();
    }

    public JwtToken generateNewToken(Authentication authentication) {
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        User userDetails = (User) authentication.getPrincipal();
        String userId = userDetails.getUsername();
        String nickname = userRepository.findNicknameByUserId(userId).get();

        //accessToken 생성
        String accessToken = Jwts.builder()
                .setSubject(nickname)
                .claim("auth", authorities)
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

        //JwtToken 생성
        return JwtToken.builder()
                .grantType(AUTHENTICATION_PREFIX)
                .accessToken(accessToken)
                .userId("userId")
                .build();
    }

    public Authentication getAuthentication(String accessToken) {
        //토큰 복호화
        Claims claims = parseClaims(accessToken);

        if (claims.get("auth") == null) {
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get("auth").toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        UserDetails principal = new User(claims.getSubject(), "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("Invalid JWT Token", e);
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT Token", e);
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT Token", e);
        } catch (IllegalArgumentException e) {
            log.info("JWT claims string is empty.", e);
        }
        return false;
    }

    private Claims parseClaims(String accessToken) {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}
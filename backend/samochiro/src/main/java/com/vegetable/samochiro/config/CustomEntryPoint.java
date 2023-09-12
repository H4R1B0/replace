package com.vegetable.samochiro.config;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vegetable.samochiro.service.TokenService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ProblemDetail;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
@Slf4j
public class CustomEntryPoint implements AuthenticationEntryPoint {
    private final String BEARER_PREFIX = "Bearer ";
    private final TokenService tokenService;

    public CustomEntryPoint(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        String bearerToken = request.getHeader(AUTHORIZATION);
        String accessToken = null;
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
            accessToken = bearerToken.substring(BEARER_PREFIX.length());
        }
        log.debug(accessToken);
//        //redis에 refresh 토큰이 있는지 확인
        boolean isExist = tokenService.refreshToken(accessToken).isPresent();
        log.debug(Boolean.toString(isExist));

        //응답 data
        ProblemDetail pb = ProblemDetail.forStatus(HttpStatusCode.valueOf(HttpStatus.FORBIDDEN.value()));
        pb.setInstance(URI.create(request.getRequestURI()));
        ObjectMapper objectMapper = new ObjectMapper();
        PrintWriter writer = response.getWriter();
        if (isExist) {
            log.debug("refresh 토큰 존재");
            pb.setDetail("Access");
        } else {
            log.debug("refresh 토큰 만료");
            pb.setDetail("Refresh");
        }
        response.setCharacterEncoding(StandardCharsets.UTF_8.name());
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8");
        writer.write(objectMapper.writeValueAsString(pb));
    }
}
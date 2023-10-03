package com.vegetable.samochiro.util;

import com.vegetable.samochiro.oauth2.token.JwtTokenService;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class HeaderUtils {
    private final JwtTokenService jwtTokenService;

    public HeaderUtils(JwtTokenService jwtTokenService) {
        this.jwtTokenService = jwtTokenService;
    }

    public String getUserId(String authorizationHeader) {
        String accessToken = authorizationHeader.substring(7);
        return jwtTokenService.findUserId(accessToken);
    }

    public Boolean isAudio(String contentType) {
        System.out.println("contentType = " + contentType);
        Set<String> audioDic = new HashSet<>(List.of("audio/mp4", "audio/mpeg", "audio/wave", "audio/wav"));
        return audioDic.contains(contentType);
    }
}

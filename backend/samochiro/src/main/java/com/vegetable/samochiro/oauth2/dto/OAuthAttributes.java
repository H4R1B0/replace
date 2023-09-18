package com.vegetable.samochiro.oauth2.dto;

import com.vegetable.samochiro.domain.User;
import com.vegetable.samochiro.oauth2.domain.RoleType;
import com.vegetable.samochiro.oauth2.domain.SocialType;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
@Builder
public class OAuthAttributes {
    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String id;
    private String nickname;
    private String email;
    private String socialType;

    //구글 고정 변수
    private static final String GOOGLE_ID = "sub";
    private static final String GOOGLE_NICKNAME = "name";
    private static final String GOOGLE_EMAIL = "email";
    //네이버 고정 변수
    private static final String NAVER_ID = "id";
    private static final String NAVER_NICKNAME = "nickname";
    private static final String NAVER_EMAIL = "email";
    //카카오 고정 변수
    private static final String KAKAO_ID = "id";
    private static final String KAKAO_NICKNAME = "nickname";
    private static final String KAKAO_EMAIL = "email";

    public static OAuthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes) {
        if ("naver".equals(registrationId)) {
            return ofNaver("id", attributes);
        } else if ("kakao".equals(registrationId)) {
            return ofKakao("id", attributes);
        }

        return ofGoogle(userNameAttributeName, attributes);
    }

    private static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
            .id(attributes.get(GOOGLE_ID).toString())
            .nickname(attributes.get(GOOGLE_NICKNAME).toString())
            .email(attributes.get(GOOGLE_EMAIL).toString())
            .socialType(SocialType.GOOGLE.toString())
            .attributes(attributes)
            .nameAttributeKey(userNameAttributeName)
            .build();
    }

    private static OAuthAttributes ofNaver(String userNameAttributeName, Map<String, Object> attributes) {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        return OAuthAttributes.builder()
            .id(response.get(NAVER_ID).toString())
            .nickname(response.get(NAVER_NICKNAME).toString())
            .email(response.get(NAVER_EMAIL).toString())
            .socialType(SocialType.NAVER.toString())
            .attributes(response)
            .nameAttributeKey(userNameAttributeName)
            .build();
    }

    private static OAuthAttributes ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
        Map<String, Object> response = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> account = (Map<String, Object>) response.get("profile");

        return OAuthAttributes.builder()
            .id(attributes.get(KAKAO_ID).toString())
            .nickname(account.get(KAKAO_NICKNAME).toString())
            .email(response.get(KAKAO_EMAIL).toString())
            .socialType((SocialType.KAKAO).toString())
            .attributes(attributes)
            .nameAttributeKey(userNameAttributeName)
            .build();
    }

    public User toEntity() {
        return User.builder()
            .id(id)
            .nickname(nickname)
            .email(email)
            .socialType(SocialType.valueOf(socialType))
            .roleType(RoleType.USER)
            .build();
    }
}
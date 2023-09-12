package com.vegetable.samochiro.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@RedisHash(value = "accessToken", timeToLive = 604800000L)
public class Token {
    private String type;
    @Id
    private String accessToken;
    private String refreshToken;
}
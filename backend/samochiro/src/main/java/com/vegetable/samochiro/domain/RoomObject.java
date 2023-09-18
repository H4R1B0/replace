package com.vegetable.samochiro.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Data
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@RedisHash(value = "roomObject")
public class RoomObject {
    @Id
    private String roomUuid;
    private String aiVoiceUuid;
    private String frameUuid;
    private String radioUuid;
}

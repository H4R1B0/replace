package com.vegetable.samochiro.dto.radio;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RadioVoiceResponse {

    private long voiceId;
    private String voiceUrl;
    private LocalDateTime registDate;

}

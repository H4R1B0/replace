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
public class VoiceItem {

    private long voiceId;
    private LocalDateTime registDate;
    private String voiceUrl;

}

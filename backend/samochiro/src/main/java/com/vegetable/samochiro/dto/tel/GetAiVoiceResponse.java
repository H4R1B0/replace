package com.vegetable.samochiro.dto.tel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetAiVoiceResponse {

    private String message;
    private String voiceFileUrl;

}

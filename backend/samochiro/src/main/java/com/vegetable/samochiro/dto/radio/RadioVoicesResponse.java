package com.vegetable.samochiro.dto.radio;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RadioVoicesResponse {

    private List<VoiceItem> voiceItems;
    private long total;

}

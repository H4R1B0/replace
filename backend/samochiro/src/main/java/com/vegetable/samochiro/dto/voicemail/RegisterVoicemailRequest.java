package com.vegetable.samochiro.dto.voicemail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterVoicemailRequest {
    String toUserNickname;
}

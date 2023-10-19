package com.vegetable.samochiro.dto.voicemail;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VoicemailResponse {

   long voicemailId;
   LocalDateTime sendDate;
   String fromUserNickname;
   String voicemailUrl;

}

package com.vegetable.samochiro.dto.voicemail;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class VoicemailItem {
    long voicemailId;
    LocalDateTime sendDate;
    String fromUserNickname;
    String voicemailUrl;

    public VoicemailItem(long voicemailId, LocalDateTime sendDate, String fromUserNickname, String voicemailUrl) {
        this.voicemailId = voicemailId;
        this.sendDate = sendDate;
        this.fromUserNickname = fromUserNickname;
        this.voicemailUrl = voicemailUrl;
    }
}

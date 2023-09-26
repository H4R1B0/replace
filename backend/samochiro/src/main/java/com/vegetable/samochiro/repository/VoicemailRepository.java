package com.vegetable.samochiro.repository;

import com.vegetable.samochiro.domain.Voicemail;
import com.vegetable.samochiro.dto.voicemail.VoicemailItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VoicemailRepository extends JpaRepository<Voicemail, Long> {

    @Query("select new com.vegetable.samochiro.dto.voicemail.VoicemailItem(v.id, v.sendDate, v.fromUser.nickname) from Voicemail v where v.toUser.id=:userId")
    List<VoicemailItem> getVoicemails(String userId);

    @Query("select v from Voicemail v where v.toUser.id=:userId or v.fromUser.id=:userId")
    List<Voicemail> findByUserId(String userId);
}

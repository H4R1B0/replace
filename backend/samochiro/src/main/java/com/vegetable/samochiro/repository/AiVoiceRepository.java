package com.vegetable.samochiro.repository;

import com.vegetable.samochiro.domain.AiVoice;
import com.vegetable.samochiro.enums.SituationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AiVoiceRepository extends JpaRepository<AiVoice, Long> {

    @Query("select a from AiVoice a where a.room.uuid=:roomUuid and a.situationType=:situationType")
    List<AiVoice> findByRoomUuidAndSituation(String roomUuid, SituationType situationType);
}

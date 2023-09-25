package com.vegetable.samochiro.repository;

import com.vegetable.samochiro.domain.AIVoice;
import com.vegetable.samochiro.enums.SituationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AIVoiceRepository extends JpaRepository<AIVoice, Long> {

    @Query("select a from AIVoice a where a.room.uuid=:roomUuid and a.situationType=:situationType")
    List<AIVoice> findByRoomUuidAndSituation(String roomUuid, SituationType situationType);

    @Query("select a from AIVoice a where a.room.uuid=:roomUuid")
    List<AIVoice> findAllByRoomUuid(String roomUuid);
}

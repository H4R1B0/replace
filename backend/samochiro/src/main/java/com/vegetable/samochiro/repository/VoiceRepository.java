package com.vegetable.samochiro.repository;

import com.vegetable.samochiro.domain.Voice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoiceRepository extends JpaRepository<Voice, Long> {
    @Query("select v from Voice v where v.room.uuid=:roomUuid order by v.registDate desc")
    List<Voice> findByRoomUuid(String roomUuid);
}
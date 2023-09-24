package com.vegetable.samochiro.repository;

import com.vegetable.samochiro.domain.Voice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoiceRepository extends JpaRepository<Voice, String> {
}
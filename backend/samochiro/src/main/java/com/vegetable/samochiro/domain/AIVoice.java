package com.vegetable.samochiro.domain;

import com.vegetable.samochiro.enums.SituationType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "ai_voice")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AIVoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ai_voice_id", nullable = false)
    private Long id;

    @Column(name = "ai_voice_url", nullable = false)
    private String url;

    @Column(name = "ai_voice_name", nullable = false)
    private String name;

    @Column(name = "situation", nullable = false)
    @Enumerated(EnumType.STRING)
    private SituationType situationType;

    @Column(name = "regist_date", nullable = false, columnDefinition = "datetime")
    private LocalDateTime registDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_uuid")
    private Room room;

}

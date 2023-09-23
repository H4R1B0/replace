package com.vegetable.samochiro.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "voice")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Voice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "voice_id", nullable = false)
    private Long id;

    @Column(name = "voice_url", nullable = false)
    private String url;

    @Column(name = "voice_name", nullable = false)
    private String name;

    @Column(name = "regist_date", nullable = false, columnDefinition = "datetime")
    private LocalDateTime registDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_uuid")
    private Room room;

}

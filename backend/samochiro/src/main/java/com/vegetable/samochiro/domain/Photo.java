package com.vegetable.samochiro.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Photo {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="photo_id", nullable = false)
	private Long id;

	@Column(name = "photo_url", nullable = false, length = 255)
	private String url;

	@Column(name = "photo_name", nullable = false, length = 255)
	private String name;

	@Column(name = "regist_date", nullable = false)
	private LocalDate registDate;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "room_uuid")
	private Room room;

}

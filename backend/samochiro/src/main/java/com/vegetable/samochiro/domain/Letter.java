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
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "letter")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Letter {

//	@Builder
//	public Letter() {
//		this.writeTime = LocalDateTime.now();
//	}

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="letter_id", nullable = false)
	private Long letterId;

	@Column(length = 50, nullable = false)
	private String title;

	@Column(columnDefinition = "text", nullable = false)
	private String content;

	@Column(name = "write_time", nullable = false, columnDefinition = "datetime")
	private LocalDateTime writeTime;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "room_uuid")
	private Room room;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

}

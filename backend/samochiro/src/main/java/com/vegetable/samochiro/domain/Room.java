package com.vegetable.samochiro.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name = "room")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Room {

	@Id @Column(name = "room_uuid", length = 36)
	private String uuid;

	@Column(name = "target_name" , length = 20)
	private String targetName;

	@Column(nullable = false)
	private int sequence;

	@Column(length = 1)
	private String targetGender;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

}


package com.vegetable.samochiro.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "wreath_user")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WreathUser {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "wreath_user_id")
	private Long wreathUserId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "wreath_id")
	private Wreath wreath;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

}

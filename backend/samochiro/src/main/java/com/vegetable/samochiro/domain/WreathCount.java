package com.vegetable.samochiro.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name = "wreath_count")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WreathCount {

	@Id @Column(name = "wreath_count_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long wreathCountId;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "wreath_id", referencedColumnName = "wreath_id")
	private Wreath wreath;

	@Column(nullable = false, columnDefinition = "int DEFAULT 0")
	private int flower;

	@Column(nullable = false, columnDefinition = "int DEFAULT 0")
	private int candle;

	@Column(nullable = false, columnDefinition = "int DEFAULT 0")
	private int ribbon;

}

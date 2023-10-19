package com.vegetable.samochiro.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "declaration")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Declaration {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long declarationId;

	@Column(nullable = false, name = "declaration_type", length = 50)
	private String declarationType;

	@Column(name = "declaration_content", columnDefinition = "text")
	private String declarationContent;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne
	@JoinColumn(name = "wreath_id")
	private Wreath wreath;

}

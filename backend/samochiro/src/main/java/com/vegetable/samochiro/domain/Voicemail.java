package com.vegetable.samochiro.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "voice_mail")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Voicemail {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="voicemail_id", nullable = false)
	private Long id;

	@Column(name="voicemail_url", nullable = false)
	private String url;

	@Column(name = "send_date", nullable = false, columnDefinition = "datetime")
	private LocalDateTime sendDate;

	@Column(name="voicemail_name", nullable = false)
	private String name;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "from_user_id", referencedColumnName = "user_id")
	private User fromUser;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "to_user_id", referencedColumnName = "user_id")
	private User toUser;

}

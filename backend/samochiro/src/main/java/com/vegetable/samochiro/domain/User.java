package com.vegetable.samochiro.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name = "user")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

	@Id
	@Column(name = "user_id", length = 50)
	private String userId;

	@Column(name = "password", length = 320)
	private String email;

	@Column(name = "nickname", length = 20)
	private String nickname;

	@Column(name = "is_change")
	private boolean isChange;

	@Column(name = "social_type", length = 20)
	private String socialType;

	@OneToMany(mappedBy = "user")
	private List<Room> rooms = new ArrayList<>();

}

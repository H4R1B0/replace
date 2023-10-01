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
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name = "wreath")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Wreath {

	@Id @Column(name = "wreath_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long wreathId;

	@Column(length = 50, nullable = false)
	private String title;

	@Column(name = "sub_title", length = 100, nullable = false)
	private String subTitle;

	@Column(columnDefinition = "text", nullable = false)
	private String description;

	@Column(name = "start_date", nullable = false)
	private LocalDate startDate;

	@Column(name = "end_date", nullable = false)
	private LocalDate endDate;

	@Column(name = "declaration_count", columnDefinition = "int DEFAULT 0", nullable = false)
	private int declarationCount;

	@Builder.Default
	@Column(name = "declaration_status", columnDefinition = "varchar(50) DEFAULT 'NONE'", nullable = false)
	private String declarationStatus = "NONE";

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

//	@MapsId
	@OneToOne(mappedBy = "wreath", fetch = FetchType.LAZY)
	private WreathCount wreathCount;

    @OneToMany(mappedBy = "wreath")
    @Builder.Default
    private List<WreathUser> wreathUserList = new ArrayList<>();

	public void addWreathCount(WreathCount wreathCount) {
		this.wreathCount = wreathCount;
		wreathCount.setWreath(this);
	}

}

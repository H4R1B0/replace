package com.vegetable.samochiro.domain;

import com.vegetable.samochiro.oauth2.domain.RoleType;
import com.vegetable.samochiro.oauth2.domain.SocialType;


import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "user")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @Column(name = "user_id", length = 50)
    private String id;

    @Builder.Default
    private String password = "NO_PASS";

    @Column(name = "email", length = 320)
    private String email;

    @Column(name = "nickname", length = 20)
    private String nickname;

    @Column(name = "is_change")
    private boolean isChange;

    @Enumerated(EnumType.STRING)
    private RoleType roleType;

    @Column(name = "social_type", length = 20)
    @Enumerated(EnumType.STRING)
    private SocialType socialType;

    @Column(length = 1)
    private String gender;

    @OneToMany(mappedBy = "user")
    @Builder.Default
    private List<Room> rooms = new ArrayList<>();

    @OneToMany(mappedBy = "toUser", fetch = FetchType.LAZY)
    @Builder.Default
    private List<Voicemail> receivedVoicemails = new ArrayList<>();

    public User update(String email) {
        this.email = email;
        return this;
    }

    public String getRoleKey() {
        return this.roleType.getKey();
    }
}

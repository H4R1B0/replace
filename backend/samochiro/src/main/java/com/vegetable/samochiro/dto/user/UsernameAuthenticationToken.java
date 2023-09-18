package com.vegetable.samochiro.dto.user;

import java.util.Collection;
import java.util.Collections;
import javax.security.auth.Subject;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

/* id만 가지고 토큰 생성을 위함 */
public class UsernameAuthenticationToken extends AbstractAuthenticationToken {

	private String id;

	/* 빈 목록 포함 기본 생성자 */
	public UsernameAuthenticationToken() {
		super(Collections.emptyList());
	}

	/* 권한 정보 목록 포함 기본 생성자 */
//	public UsernameAuthenticationToken(Collection<? extends GrantedAuthority> authorities) {
//		super(authorities);
//	}

	public UsernameAuthenticationToken(String id) {
		super(Collections.emptyList());
		this.id = id;
	}

	@Override
	public Object getCredentials() {
		return null;
	}

	@Override
	public Object getPrincipal() {
		return id;
	}

//	public Authentication toAuthentication() {
//		return this;
//	}
}

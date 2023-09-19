package com.vegetable.samochiro.dto.room;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Getter
@NoArgsConstructor
public class RegisterTargetNameRequest {
    private String roomUuid;
    private String targetName;
}

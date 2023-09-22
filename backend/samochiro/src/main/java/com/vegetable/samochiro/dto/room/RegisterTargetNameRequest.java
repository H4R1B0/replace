package com.vegetable.samochiro.dto.room;

import lombok.*;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class RegisterTargetNameRequest {
    private String targetName;
    private String targetGender;
}

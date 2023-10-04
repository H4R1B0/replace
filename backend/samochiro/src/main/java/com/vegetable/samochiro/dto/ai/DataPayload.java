package com.vegetable.samochiro.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DataPayload {
    String roomUuid;
    String gender;
    List<String> fileUrls;
}
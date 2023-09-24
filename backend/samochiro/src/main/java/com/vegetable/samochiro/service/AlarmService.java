package com.vegetable.samochiro.service;

import com.vegetable.samochiro.domain.Alarm;
import com.vegetable.samochiro.dto.alarm.AlarmListResponse;
import com.vegetable.samochiro.repository.AlarmRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AlarmService {

	private final AlarmRepository alarmRepository;

	public List<AlarmListResponse> getAlarmList(String userId) {
		List<Alarm> alarmList = alarmRepository.findAllByUserId(userId).get();
		List<AlarmListResponse> responseList = new ArrayList<>();

		for (Alarm alarm : alarmList) {
			AlarmListResponse response = AlarmListResponse.builder()
				.id(alarm.getId())
				.message(alarm.getMessage())
				.build();
			responseList.add(response);
		}
		return responseList;
	}
	//알림 리스트 조회 - 알림 2번
	
	public void deleteAlarm(Long alarmId) {
		alarmRepository.deleteById(alarmId);
	}
	//알림 삭제 - 알림 3번
	
}

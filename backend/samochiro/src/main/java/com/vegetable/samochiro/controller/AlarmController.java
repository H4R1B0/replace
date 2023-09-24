package com.vegetable.samochiro.controller;

import com.vegetable.samochiro.dto.alarm.AlarmListResponse;
import com.vegetable.samochiro.service.AlarmService;
import com.vegetable.samochiro.util.HeaderUtils;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/alarm")
public class AlarmController {

	private AlarmService alarmService;
	private final HeaderUtils headerUtils;
	
	@GetMapping
	public ResponseEntity<Response> getAlarmList(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
		try {
			String userId = headerUtils.getUserId(authorizationHeader);
			List<AlarmListResponse> alarmList = alarmService.getAlarmList(userId);
			int total = alarmList.size();
			return ResponseEntity.ok(new AlarmController.Response(alarmList, total));

		}
		catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body(new AlarmController.Response("잘못된 요청입니다."));
		}
	}
	//알람 리스트 조회 - 알람 2번

	@DeleteMapping
	public ResponseEntity<String> deleteAlarm(@PathVariable Long alarmId) {
		try {
			alarmService.deleteAlarm(alarmId);
			return ResponseEntity.ok("삭제가 완료되었습니다.");
		}
		catch (Exception e) {
			return ResponseEntity.badRequest().body("잘못된 요청입니다.");
		}
	}
	//알람 삭제 - 알람 3번

	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	static class Response<T> {
		private T data;
		private int size;
		public Response (T data) {
			this.data = data;
		}
	}
	//리스트 반환용 클래스
	
}

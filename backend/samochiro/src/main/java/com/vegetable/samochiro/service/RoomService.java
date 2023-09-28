package com.vegetable.samochiro.service;


import com.vegetable.samochiro.domain.Room;
import com.vegetable.samochiro.dto.room.RegisterTargetNameRequest;
import com.vegetable.samochiro.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;

    @Transactional
    public void registerTargetName(int roomSequence, String userId, RegisterTargetNameRequest request) {
        String targetName = request.getTargetName();
        Optional<Room> findRoom = roomRepository.findBySequenceAndUserId(roomSequence, userId);
        findRoom.get().setTargetName(targetName);
        findRoom.get().setTargetGender(request.getTargetGender());
    }
    //기억의 방 대상 등록 - 방 1

    public String getRoomUuid(int roomSequence, String userId) {
        return roomRepository.findBySequenceAndUserId(roomSequence, userId).get().getUuid();
    }
    //방 uuid 조회

    @Transactional
    public void resetTargetName(String roomUuid) {
        Optional<Room> room = roomRepository.findByRoomUuid(roomUuid);
        room.get().setTargetName(null);
    }
    //방 대상 지우기

}

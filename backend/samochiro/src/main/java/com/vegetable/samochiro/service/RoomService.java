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
    public void registerTargetName(RegisterTargetNameRequest request) {
        String roomUuid = request.getRoomUuid();
        String targetName = request.getTargetName();
        Optional<Room> findRoom = roomRepository.findById(roomUuid);
        findRoom.get().setTargetName(targetName);
    }
    //기억의 방 대상 등록 - 방 1
}

package com.vegetable.samochiro.repository;

import com.vegetable.samochiro.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, String> {
    @Query("select r from Room r join fetch r.user u where r.sequence=:roomSequence and u.id=:userId")
    Optional<Room> findByRoomSequenceUserId(int roomSequence, String userId);
}
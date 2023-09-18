package com.vegetable.samochiro.repository;

import com.vegetable.samochiro.domain.RoomObject;
import org.springframework.data.repository.CrudRepository;

public interface RoomObjectRepository extends CrudRepository<RoomObject, String> {
}
package com.vegetable.samochiro.controller;

import com.vegetable.samochiro.dto.error.CustomErrorResponse;
import com.vegetable.samochiro.exception.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler({UserNotFoundException.class, FirstRoomRegisterException.class, RoomRangeException.class, RegisteredRoomException.class})
    public ResponseEntity<CustomErrorResponse> badRequestException(Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new CustomErrorResponse(e.getMessage()));
    }

    @ExceptionHandler(RoomNotFoundException.class)
    public ResponseEntity<CustomErrorResponse> internalServerErrorException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new CustomErrorResponse(e.getMessage()));
    }
}

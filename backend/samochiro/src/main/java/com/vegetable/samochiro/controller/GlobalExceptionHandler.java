package com.vegetable.samochiro.controller;

import com.vegetable.samochiro.dto.error.CustomErrorResponse;
import com.vegetable.samochiro.dto.user.NicknameUpdateResponse;
import com.vegetable.samochiro.enums.CustomErrorType;
import com.vegetable.samochiro.exception.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
//    @ExceptionHandler({UserNotFoundException.class, FirstRoomRegisterException.class,
//            RoomRangeException.class, RegisteredRoomException.class, FirstRoomDeleteException.class, SendVoicemailSelfException.class,
//            FileContentTypeException.class, VoiceCountZeroException.class, VoicemailNotFoundException.class, LetterNotFoundException.class,
//            SituationEnumException.class, AIVoiceNotFoundException.class, VoiceNotFoundException.class
//    })
//    public ResponseEntity<CustomErrorResponse> customBadRequestException(Exception e) {
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new CustomErrorResponse(e.getMessage()));
//    }
//
//    @ExceptionHandler({NicknameUpdateException.class})
//    public ResponseEntity<NicknameUpdateResponse> nicknameUpdateException(Exception e) {
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new NicknameUpdateResponse(null, e.getMessage()));
//    }
//
//    @ExceptionHandler(RoomNotFoundException.class)
//    public ResponseEntity<CustomErrorResponse> internalServerErrorException(Exception e) {
//        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new CustomErrorResponse(e.getMessage()));
//    }

//    @ExceptionHandler({Exception.class})
//    public ResponseEntity<CustomErrorResponse> commonBadRequestException(Exception e) {
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new CustomErrorResponse(CustomErrorType.BAD_REQUEST.getMessage()));
//    }
}

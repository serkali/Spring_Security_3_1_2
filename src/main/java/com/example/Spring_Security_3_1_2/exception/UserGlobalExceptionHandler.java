package com.example.Spring_Security_3_1_2.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class UserGlobalExceptionHandler {
    @ExceptionHandler
    public ResponseEntity<UserIncorrectData> handlerException(NoUserSuchException e) {
        UserIncorrectData data = new UserIncorrectData();
        data.setInfo(e.getMessage());
        return new ResponseEntity<>(data, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler
    public ResponseEntity<UserIncorrectData> handlerException(Exception e) {
        UserIncorrectData data = new UserIncorrectData();
        data.setInfo(e.getMessage());
        return new ResponseEntity<>(data, HttpStatus.BAD_REQUEST);
    }
}

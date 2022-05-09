package com.example.Spring_Security_3_1_2.exception;

public class NoUserSuchException extends RuntimeException{
    public NoUserSuchException(String message) {
        super(message);
    }
}

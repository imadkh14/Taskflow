package com.imaddev.tasksapp.dto;

public record ErrorResponce(
    
    int status,
    String message,
    String details

) {
}

package com.imaddev.tasksapp.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import com.imaddev.tasksapp.dto.ErrorResponce;

@ControllerAdvice //intercepte globalement les exceptions dans les contrôleurs.
public class GlobalExeptionHandler {

    @ExceptionHandler(IllegalArgumentException.class) //définit comment traiter une exception spécifique.
    public ResponseEntity<ErrorResponce> exeptionHandler1(IllegalArgumentException ex,WebRequest request){
        ErrorResponce errorResponce = new ErrorResponce(HttpStatus.BAD_REQUEST.value(), 
                                                        ex.getMessage(), 
                                                        request.getDescription(false));
        return new ResponseEntity<>(errorResponce,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponce> exeptionHandler2(Exception ex,WebRequest request){
        ErrorResponce errorResponce = new ErrorResponce(HttpStatus.BAD_REQUEST.value(), 
                                                        ex.getMessage(), 
                                                        request.getDescription(false));
        return new ResponseEntity<>(errorResponce,HttpStatus.BAD_REQUEST);
    }

}

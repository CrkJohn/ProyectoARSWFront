package com.example.controller;

import com.example.model.ChatMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    
    @Autowired
    SimpMessagingTemplate msgt;
    

    @MessageMapping("/chat.sendMessage.{numdibujo}}")
    public void sendMessage(@Payload ChatMessage chatMessage, @DestinationVariable String numdibujo) {
        //System.out.println("Aqui karen " +   chatMessage.toString());
        msgt.convertAndSend("/topic/public."+numdibujo,chatMessage);
    }

    @MessageMapping("/chat.addUser.{numdibujo}")
    //@SendTo("/topic/public")
    public void addUser(@Payload ChatMessage chatMessage,
                               SimpMessageHeaderAccessor headerAccessor,
                               @DestinationVariable String numdibujo) {
        // Add username in web socket session
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        msgt.convertAndSend("/topic/public."+numdibujo,chatMessage);
                       
        //return chatMessage;
    }

}
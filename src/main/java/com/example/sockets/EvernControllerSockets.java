package com.example.sockets;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.controller.Viaje;


@Controller
@RequestMapping("/")
public class EvernControllerSockets {
	
	
	@MessageMapping("/topic/newpoint")
    @SendTo("/topic/newpoint")
    public Viaje sendMessage(@Payload Viaje viaje) {
        return viaje;
    }
	
}

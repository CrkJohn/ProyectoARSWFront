package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

	@RequestMapping("/index")
	  String index() {
	    return "index";
	 }
	
	@RequestMapping(value = { "/" , "login" })
	String login() {
	    return "login";
	}
	
	@RequestMapping("/userHome")
	String userHome() {
	    return "userHome";
	}
	
	
	@RequestMapping("/configuracion")
	String configuracion() {
		return "configuracion";
	}
	
	@RequestMapping("/pagos")
	String pagos() {
		return "pagos";
	}
	
	@RequestMapping("/viajes")
	String viajes() {
		return "viajes";
	}
	
	@RequestMapping("/cupones")
	String cupones() {
		return "cupones";
	}
	
	@RequestMapping("/confConductor")
	String confConductor() {
		return "confConductor";
	}
	
	@RequestMapping("/navbar")
	String navbar() {
		return "navbar";
	}
	
	@RequestMapping("/register")
	String register() {
		return "register";
	}
	
	
	
	
	
	
	
	
	
}
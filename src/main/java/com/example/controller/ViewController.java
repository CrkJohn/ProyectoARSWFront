package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

	@RequestMapping(value = { "/" , "index" })
	String index() {
	    return "index";
	}
	
	@RequestMapping("/loginPasajero")
	String loginPasajero(){
		return "loginPasajero";
	}

	@RequestMapping("/loginConductor")
	String loginConductor(){
		return "loginConductor";
	}

	@RequestMapping("/userHome")
	String userHome() {
	    return "userHome";
	}
	
	
	@RequestMapping("/configuracion")
	String configuracion() {
		return "configuracion";
	}


	@RequestMapping("/maps")
	String mapsp() {
		return "mapsP";
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
	
	@RequestMapping("/navbarConductor")
	String navbarConductor() {
		return "navbarConductor";
	}
	
	@RequestMapping("/register")
	String register() {
		return "register";
	}

	@RequestMapping("/registroConductor")
	String registroConductor(){
		return "registroConductor";
	}
	
	@RequestMapping("/registroPasajero")
	String registroPasajero(){
		return "registroPasajero";
	}

	@RequestMapping("/perfilConductor")
	String perfilConductor() {
		return "perfilConductor";
	}

	@RequestMapping("/conductorRegister")
	String conductorRegister(){
		return "conductorRegister";
	}

	@RequestMapping("/subasta")
	String  subasta(){
		return "subasta";
	}
	
}
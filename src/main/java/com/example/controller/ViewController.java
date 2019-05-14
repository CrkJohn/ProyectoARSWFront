package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

	@RequestMapping(value = { "/" , "index" })
	public String index() {
	    return "index";
	}
	
	@RequestMapping("/loginPasajero")
	public String loginPasajero(){
		return "loginPasajero";
	}

	@RequestMapping("/loginConductor")
	public String loginConductor(){
		return "loginConductor";
	}

	@RequestMapping("/perdirViajeUser")
	public String perdirViajeUser() {
		return "perdirViajeUser";
	}
	
	@RequestMapping("/perfilPasajero")
	public String perfilPasajero() {
		return "perfilPasajero";
	}

	@RequestMapping("/maps")
	public String mapsp() {
		return "mapsP";
	}

	@RequestMapping("/pagos")
	public String pagos() {
		return "pagos";
	}

	@RequestMapping("/viajesRealizados")
	public String viajesHechosConductor(){
		return "viajesHechosConductor";
	}
	
	@RequestMapping("/viajes")
	public String viajes() {
		return "viajes";
	}
	
	@RequestMapping("/cupones")
	public String cupones() {
		return "cupones";
	}
	
	@RequestMapping("/viajesDisponiblesConductor")
	public String viajesDisponiblesConductor() {
		return "viajesDisponiblesConductor";
	}
	
	@RequestMapping("/navbarConductor")
	public String navbarConductor() {
		return "navbarConductor";
	}
	
	@RequestMapping("/register")
	public String register() {
		return "register";
	}

	@RequestMapping("/registroConductor")
	public String registroConductor(){
		return "registroConductor";
	}
	
	@RequestMapping("/registroPasajero")
	public String registroPasajero(){
		return "registroPasajero";
	}

	@RequestMapping("/perfilConductor")
	public String perfilConductor() {
		return "perfilConductor";
	}

	@RequestMapping("/conductorRegister")
	public String conductorRegister(){
		return "conductorRegister";
	}

	@RequestMapping("/subasta")
	public String  subasta(){
		return "subasta";
	}
	@RequestMapping("/subastaPasajero")
	public String  subastaPasajero(){
		return "subastaPasajero";
	}
	@RequestMapping("/prueba")
	public String prueba() {
		return "prueba";
	}
		
}
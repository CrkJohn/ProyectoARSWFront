package com.example.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

	/*
		PAGINAS PUBLICAS
	*/
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

	@RequestMapping("/registroConductor")
	public String registroConductor(){
		return "registroConductor";
	}
	
	@RequestMapping("/registroPasajero")
	public String registroPasajero(){
		return "registroPasajero";
	}




	/*
		PAGINAS DEL PASAJERO
	*/
	@RequestMapping("/perdirViajeUser")
	public String perdirViajeUser(HttpServletRequest request) {
		String correo = (String) request.getSession().getAttribute("correo");
		System.out.println("ESTE ES EL CORREO DE LA SESION");
		if(correo == null) return "redirect:/";
		String rol = (String) request.getSession().getAttribute("rol");
		System.out.println("ESTE ES EL ROL DE LA SESION");
		if(!rol.equals("pasajero")) return "redirect:/";
		return "perdirViajeUser";
	}
	
	@RequestMapping("/perfilPasajero")
	public String perfilPasajero(HttpServletRequest request) {
		String correo = (String) request.getSession().getAttribute("correo");
		System.out.println("ESTE ES EL CORREO DE LA SESION");
		if(correo == null) return "redirect:/";

		String rol = (String) request.getSession().getAttribute("rol");
		System.out.println("ESTE ES EL ROL DE LA SESION");
		if(!rol.equals("pasajero")) return "redirect:/";
		return "perfilPasajero";
	}

	@RequestMapping("/subastaPasajero")
	public String  subastaPasajero(HttpServletRequest request){
		String correo = (String) request.getSession().getAttribute("correo");
		System.out.println("ESTE ES EL CORREO DE LA SESION "+correo);
		if(correo == null) return "redirect:/";
		String rol = (String) request.getSession().getAttribute("rol");
		System.out.println("ESTE ES EL ROL DE LA SESION "+rol);
		if(!rol.equals("pasajero")) return "redirect:/";
		return "subastaPasajero";
	}

	@RequestMapping("/misViajes")
	public String viajesHechosPasajero(HttpServletRequest request) {
		String correo = (String) request.getSession().getAttribute("correo");
		System.out.println("ESTE ES EL CORREO DE LA SESION "+correo);
		if(correo == null) return "redirect:/";
		String rol = (String) request.getSession().getAttribute("rol");
		System.out.println("ESTE ES EL ROL DE LA SESION "+rol);
		if(!rol.equals("pasajero")) return "redirect:/";
		return "viajesHechosPasajero";
	}


	@RequestMapping("/cupones")
	public String cupones(HttpServletRequest request) {
		String correo = (String) request.getSession().getAttribute("correo");
		System.out.println("ESTE ES EL CORREO DE LA SESION "+correo);
		if(correo == null) return "redirect:/";
		String rol = (String) request.getSession().getAttribute("rol");
		System.out.println("ESTE ES EL ROL DE LA SESION "+rol);
		if(!rol.equals("pasajero")) return "redirect:/";
		return "cupones";
	}



	/*
		PAGINAS DEL CONDUCTOR
	*/
	@RequestMapping("/viajesRealizados")
	public String viajesHechosConductor(HttpServletRequest request){
		String correo = (String) request.getSession().getAttribute("correo");
		System.out.println("ESTE ES EL CORREO DE LA SESION "+correo);
		if(correo == null) return "redirect:/";
		String rol = (String) request.getSession().getAttribute("rol");
		System.out.println("ESTE ES EL ROL DE LA SESION "+rol);
		if(!rol.equals("conductor")) return "redirect:/";
		return "viajesHechosConductor";
	}


	@RequestMapping("/viajesDisponiblesConductor")
	public String viajesDisponiblesConductor(HttpServletRequest request) {
		String correo = (String) request.getSession().getAttribute("correo");
		System.out.println("ESTE ES EL CORREO DE LA SESION "+correo);
		if(correo == null) return "redirect:/";
		String rol = (String) request.getSession().getAttribute("rol");
		System.out.println("ESTE ES EL ROL DE LA SESION "+rol);
		if(!rol.equals("conductor")) return "redirect:/";
		return "viajesDisponiblesConductor";
	}	

	@RequestMapping("/perfilConductor")
	public String perfilConductor(HttpServletRequest request) {
		String correo = (String) request.getSession().getAttribute("correo");
		System.out.println("ESTE ES EL CORREO DE LA SESION "+correo);
		if(correo == null) return "redirect:/";
		String rol = (String) request.getSession().getAttribute("rol");
		System.out.println("ESTE ES EL ROL DE LA SESION "+rol);
		if(!rol.equals("conductor")) return "redirect:/";
		return "perfilConductor";
	}


	@RequestMapping("/subasta")
	public String  subasta(HttpServletRequest request){
		String correo = (String) request.getSession().getAttribute("correo");
		System.out.println("ESTE ES EL CORREO DE LA SESION "+correo);
		if(correo == null) return "redirect:/";
		String rol = (String) request.getSession().getAttribute("rol");
		System.out.println("ESTE ES EL ROL DE LA SESION "+rol);
		if(!rol.equals("conductor")) return "redirect:/";
		return "subasta";
	}
	
	@RequestMapping("/prueba")
	public String prueba() {
		return "prueba";
	}

	@RequestMapping("/maps")
	public String mapsp() {
		return "mapsP";
	}

	@RequestMapping("/pagos")
	public String pagos() {
		return "pagos";
	}
		
}
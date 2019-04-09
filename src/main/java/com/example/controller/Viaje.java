package com.example.controller;

public class Viaje {
	public String lugarOrigen;
	public String 	 lugarDestino;
	public int costo;
	public Viaje(){
	
	
	}
	

	public Viaje(String lugarOrigen, String lugarDestino, int costo) {
		super();
		this.lugarOrigen = lugarOrigen;
		this.lugarDestino = lugarDestino;
		this.costo = costo;
	}
	public String getLugarOrigen() {
		return lugarOrigen;
	}
	public void setLugarOrigen(String lugarOrigen) {
		this.lugarOrigen = lugarOrigen;
	}
	public String getLugarDestino() {
		return lugarDestino;
	}
	public void setLugarDestino(String lugarDestino) {
		this.lugarDestino = lugarDestino;
	}
	public int getCosto() {
		return costo;
	}
	public void setCosto(int costo) {
		this.costo = costo;
	}
	
}

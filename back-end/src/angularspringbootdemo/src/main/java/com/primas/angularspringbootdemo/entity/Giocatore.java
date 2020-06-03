package com.primas.angularspringbootdemo.entity;

import java.util.ArrayList;




public class Giocatore {

	private long id;
	private String nome;
	private String email;
	private MazzoCoperto mazzoCoperto = new MazzoCoperto();
	private ArrayList<Carta> mano = new ArrayList<>(4);
	
	public Giocatore(String nome, String email) {
		this.nome = nome;
		this.email = email;
	}

	public	Giocatore() {
	}

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	public ArrayList<Carta> distribuisciCarte() {
		for(int i=0; i<3; i++) {
			mano.add(mazzoCoperto.pescaCarta());
		}
		System.out.println("mano dopo distribuzione carte:"+ mano + " " + "dimensione mano: "+mano.size());
		return mano;
	}
	
	@Override
	public String toString() {
		return "Giocatore [nome=" + nome + "]";
	}
}
package com.primas.angularspringbootdemo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "leaderboard")
public class Leaderboard {
	
	@Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	private String nome;
	private int punteggioTotale;
	private int numeroPartiteTotali;
	private int numeroVittorie;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public int getPunteggioTotale() {
		return punteggioTotale;
	}
	public void setPunteggioTotale(int punteggioTotale) {
		this.punteggioTotale = punteggioTotale;
	}
	public int getNumeroPartiteTotali() {
		return numeroPartiteTotali;
	}
	public void setNumeroPartiteTotali(int numeroPartiteTotali) {
		this.numeroPartiteTotali = numeroPartiteTotali;
	}
	public int getNumeroVittorie() {
		return numeroVittorie;
	}
	public void setNumeroVittorie(int numeroVittorie) {
		this.numeroVittorie = numeroVittorie;
	}
	
	

}

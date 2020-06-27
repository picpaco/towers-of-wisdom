package com.primas.angularspringbootdemo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "leaderboard")
public class LeaderboardEntry {

	@Id
	@Column(name = "user_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "nomeGiocatore")
	private String nome;
	@Column(name = "partiteTotali")
	private int numeroPartiteTotali;
	@Column(name = "numeroPartiteVinte")
	private int numeroVittorie;
	@Column(name = "percentualeVittorie")
	private int percentualeVittorie;

	public LeaderboardEntry(String nome, int numeroPartiteTotali, int numeroVittorie) {
		this.nome = nome;
		this.numeroPartiteTotali  = numeroPartiteTotali;
		this.numeroVittorie = numeroVittorie;
	}

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
		return percentualeVittorie;
	}
	public void aggiornaPunteggioTotale(int puntiPartita) {
		this.percentualeVittorie += puntiPartita;
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
	public void aggiornaNumeroVittorie() {
		this.numeroVittorie++;
	}

}

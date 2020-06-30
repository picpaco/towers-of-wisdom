package com.primas.angularspringbootdemo.entity;

import javax.persistence.Column;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;



@Entity
@Table(name = "leaderboard")
public class LeaderboardEntry {

	@Id
	@Column(updatable = false, nullable = false)
	private String nome;
	private int numeroPartiteTotali;
	private int numeroVittorie;

	
	public LeaderboardEntry() {
	}

	public LeaderboardEntry(String nome, int numeroPartiteTotali, int numeroVittorie) {
		this.nome = nome;
		this.numeroPartiteTotali = numeroPartiteTotali;
		this.numeroVittorie = numeroVittorie;
	}

	public String getNome() {
		return nome;
	}
	
	public int getNumeroPartiteTotali() {
		return numeroPartiteTotali;
	}

	public int getNumeroVittorie() {
		return numeroVittorie;
	}

}

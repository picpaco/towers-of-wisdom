package com.primas.angularspringbootdemo.model;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.primas.angularspringbootdemo.entity.User;

@Entity
@Table(name = "leaderboard")
public class LeaderboardModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(name = "PunteggioTotaleGiocatore")
	private BigDecimal punteggioTotaleGiocatore;
	@Column(name = "PartiteTotali")
	private int partiteTotali;

	@Column(name = "NumeroPartiteVinte")
	private int numeroPartiteVinte;
	@Column(name = "NumeroPartitePerse")
	private int numeroPartitePerse;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "User")
	private User user;
	@Column(name = "NomeGiocatore")
	private String nomeGiocatore;

	public LeaderboardModel() {}

	public LeaderboardModel(long id, BigDecimal punteggioTotaleGiocatore, int partiteTotali, int numeroPartiteVinte,
			int numeroPartitePerse, User user) {
		this.id = id;
		this.punteggioTotaleGiocatore = punteggioTotaleGiocatore;
		this.partiteTotali = partiteTotali;
		this.numeroPartiteVinte = numeroPartiteVinte;
		this.numeroPartitePerse = numeroPartitePerse;
		this.user = user;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	public String getNomeGiocatore() {
		return nomeGiocatore;
	}

	public void setNomeGiocatore(String nomeGiocatore) {
		this.nomeGiocatore = nomeGiocatore;
	}

	public BigDecimal getPunteggioTotaleGiocatore() {
		return punteggioTotaleGiocatore;
	}

	public void setPunteggioTotaleGiocatore(BigDecimal punteggioTotaleGiocatore) {
		this.punteggioTotaleGiocatore = punteggioTotaleGiocatore;
	}

	public int getPartiteTotali() {
		return partiteTotali;
	}

	public void setPartiteTotali(int partiteTotali) {
		this.partiteTotali = partiteTotali;
	}

	public int getNumeroPartiteVinte() {
		return numeroPartiteVinte;
	}

	public void setNumeroPartiteVinte(int numeroPartiteVinte) {
		this.numeroPartiteVinte = numeroPartiteVinte;
	}

	public int getNumeroPartitePerse() {
		return numeroPartitePerse;
	}

	public void setNumeroPartitePerse(int numeroPartitePerse) {
		this.numeroPartitePerse = numeroPartitePerse;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "LeaderboardModel [id=" + id + ", punteggioTotaleGiocatore=" + punteggioTotaleGiocatore
				+ ", partiteTotali=" + partiteTotali + ", numeroPartiteVinte=" + numeroPartiteVinte
				+ ", numeroPartitePerse=" + numeroPartitePerse + ", user=" + user + "]";
	}

}
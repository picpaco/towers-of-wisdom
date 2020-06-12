package com.primas.angularspringbootdemo.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private String nomeutente;
	private String password;
	private String email;
	private String status;
	
	public User() {

	}
	
	public User(String status) {
		this.status=status;
	}
	
//	public User(String nomeutente, String password) {
//		super();
//		this.nomeutente = nomeutente;
//		this.password = password;
//	}
	
	public String getNomeutente() {
		return nomeutente;
	}
	public void setNomeutente(String nomeutente) {
		this.nomeutente = nomeutente;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	

}

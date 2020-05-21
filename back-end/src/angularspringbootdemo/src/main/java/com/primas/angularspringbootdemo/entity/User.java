package com.primas.angularspringbootdemo.entity;

//import javax.persistence.Entity;


//@Entity

public class User {
	
	
	private String userName;
	private String password;
	private String status;
	
	public User() {
		super();
	}
	
	public User(String status) {
		this.status=status;
	}
	
	public User(String userName, String password) {
		super();
		this.userName = userName;
		this.password = password;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
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
	
	

}

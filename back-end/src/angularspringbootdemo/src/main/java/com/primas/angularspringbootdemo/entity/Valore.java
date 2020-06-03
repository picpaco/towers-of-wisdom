package com.primas.angularspringbootdemo.entity;




public enum Valore {

	UNO("uno", 1), DUE("due", 2), TRE("tre", 3), QUATTRO("quattro", 4), CINQUE("cinque", 5), SEI("sei", 6), SETTE("sette", 7), CIMA("P", 0);
	

	private String nome;
	private int val;
	
	private Valore(String nome, int val) {
		this.nome = nome;
		this.val = val;
	}

	public int getVal() {
		return val;
	}

	public void setVal(int val) {
		this.val = val;
	}

	public String toString() {
		return nome;
	}
}

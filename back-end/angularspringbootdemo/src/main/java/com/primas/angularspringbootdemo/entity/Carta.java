package com.primas.angularspringbootdemo.entity;

public class Carta {
	
	private Simbolo simbolo;
	private Valore valore;
	private boolean isUltima;

	public Carta(Valore valore, Simbolo simbolo) {
		this.simbolo = simbolo;
		this.valore = valore ;
	}

	public Simbolo getSimbolo() {
		return simbolo;
	}


	public Valore getValore() {
		return valore;
	}

	public boolean isUltima() {
		return isUltima;
	}

	public void setUltima(boolean isUltima) {
		this.isUltima = isUltima;
	}

	@Override
	public String toString() {
		return "[" + simbolo + " " + valore + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((simbolo == null) ? 0 : simbolo.hashCode());
		result = prime * result + ((valore == null) ? 0 : valore.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Carta other = (Carta) obj;
		if (simbolo != other.simbolo)
			return false;
		if (valore != other.valore)
			return false;
		return true;
	}
	
	
	

}

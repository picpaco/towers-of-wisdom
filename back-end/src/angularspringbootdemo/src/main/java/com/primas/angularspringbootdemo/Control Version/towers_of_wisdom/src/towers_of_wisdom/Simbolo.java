package towers_of_wisdom;

public enum Simbolo { 

	Q("Quadrato"), T("Triangolo"), C("Cerchio"), A("Ancora");

	private String nome;

	private Simbolo(String nome) {
		this.nome = nome;
	}
	
	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String toString() {
		return nome;
	}
}

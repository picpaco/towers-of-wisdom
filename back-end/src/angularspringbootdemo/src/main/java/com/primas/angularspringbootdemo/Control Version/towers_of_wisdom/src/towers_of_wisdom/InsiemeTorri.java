package towers_of_wisdom;

import java.util.HashMap;
import java.util.Stack;


public class InsiemeTorri {

	//private HashMap<Simbolo, Torre> torriCarte = new HashMap<>(4); 
	private HashMap<Simbolo, Stack<Carta>> torriCarte = new HashMap<>(4); 
	private Stack<Carta> torreQuadrato = new Stack<>();
	private Stack<Carta> torreCerchio = new Stack<>();
	private Stack<Carta> torreTriangolo = new Stack<>();
	private Stack<Carta> torreAncora = new Stack<>();
	//	private Torre torreQuadrato = new Torre();
	//	private Torre torreCerchio = new Torre();
	//	private Torre torreTriangolo = new Torre();
	//	private Torre torreAncora = new Torre();
	//	private Torre torri;

	private int punteggio;

	//TODO: Fare refactoring creando classe Torre: Hashmap diventa HAshMap<Simbolo, Torre>, nella classe Torre mettere
	//stack di Carta e punteggio torre che verrà aggiornato nel metodo aggiungiCartaATorre()

	public InsiemeTorri() {
		//		torriCarte.put(Simbolo.Q, torreQuadrato);
		//		torriCarte.put(Simbolo.C, torreCerchio);
		//		torriCarte.put(Simbolo.T, torreTriangolo);
		//		torriCarte.put(Simbolo.A, torreAncora);
		torriCarte.put(Simbolo.Q, torreQuadrato);
		torriCarte.put(Simbolo.C, torreCerchio);
		torriCarte.put(Simbolo.T, torreTriangolo);
		torriCarte.put(Simbolo.A, torreAncora);
	}


	//	protected HashMap<Simbolo, Torre> getTorriCarte() {
	//		return torriCarte;
	//	}
	//
	//	protected Torre getTorreQuadrato() {
	//		return torreQuadrato;
	//	}
	//
	//	protected Torre getTorreCerchio() {
	//		return torreCerchio;
	//	}
	//
	//	protected Torre getTorreTriangolo() {
	//		return torreTriangolo;
	//	}
	//
	//	protected Torre getTorreAncora() {
	//		return torreAncora;
	//	}

	protected HashMap<Simbolo, Stack<Carta>> getTorriCarte() {
		return torriCarte;
	}


	protected Stack<Carta> getTorreQuadrato() {
		return torreQuadrato;
	}


	protected Stack<Carta> getTorreCerchio() {
		return torreCerchio;
	}


	protected Stack<Carta> getTorreTriangolo() {
		return torreTriangolo;
	}


	protected Stack<Carta> getTorreAncora() {
		return torreAncora;
	}


	protected int getPunteggio() {
		return punteggio;
	}


	public boolean isGiocabile(Carta carta) {
		assert (carta!=null): "La carta non dovrebbe essere null!";
		
		Stack<Carta> torre = torriCarte.get(carta.getSimbolo());
		if(!(torre.isEmpty())) {
			if(carta.getValore().equals(Valore.CIMA)) {
				if(torre.peek().getValore().equals(Valore.UNO)) {
					return true;
				} else {
					return false;
				}
			}
			if(carta.getValore().getVal() < torre.peek().getValore().getVal()) {
				return true;
			} 
		} else {
			if(!(carta.getValore().equals(Valore.CIMA))) {
				return true;
			}
		}
		return false;
	}



	public void aggiungiCartaATorre(Carta carta) { 
		assert (carta!=null):"La carta non dovrebbe essere null!";
		assert (isGiocabile(carta)): "La carta deve essere giocabile!";

		Stack<Carta> vecchiaTorre = torriCarte.get(carta.getSimbolo());


		vecchiaTorre.push(carta);
		System.out.println("punteggio carta: " + carta.getValore().getVal());

		calcolaPunteggioTotale();
		System.out.println("punteggio totale: " + punteggio);

		System.out.println("carta appena aggiunta alla torre: " + vecchiaTorre.peek());
	}

	@Override
	public String toString() {
		return "InsiemeTorri [torriCarte=" + torriCarte + ", torreQuadrato=" + torreQuadrato + ", torreTriangolo="
				+ torreTriangolo + ", torreCerchio=" + torreCerchio + ", torreAncora=" + torreAncora + "]";
	}


	public int calcolaPunteggioA() {
		int pA = 0;
		if(!(torreAncora.isEmpty())) {
			for(Carta c : torreAncora) {
				if(c.getSimbolo().equals(Simbolo.A)) {
					pA += c.getValore().getVal();
				}
			}
			if(torreAncora.peek().getValore().equals(Valore.CIMA)) {
				pA =  pA*2;
			}

		}
		System.out.println("punteggio torre Ancora: " + pA);
		return pA;
	}

	public int calcolaPunteggioQ() {
		int pQ = 0;
		if(!(torreQuadrato.isEmpty())) {
			for(Carta c : torreQuadrato) {
				if(c.getSimbolo().equals(Simbolo.Q)) {
					pQ += c.getValore().getVal();
				}
			}
			if(torreQuadrato.peek().getValore().equals(Valore.CIMA)) {
				pQ =  pQ*2;
			}
		}
		System.out.println("punteggio torre Quadrato: " + pQ);
		return pQ;
	}

	public int calcolaPunteggioC() {
		int pC = 0;
		if(!(torreCerchio.isEmpty())) {
			for(Carta c : torreCerchio) {
				if(c.getSimbolo().equals(Simbolo.C)) {
					pC += c.getValore().getVal();
				}
			}
			if(torreCerchio.peek().getValore().equals(Valore.CIMA)) {
				pC =  pC*2;
			}

		}
		System.out.println("punteggio torre Cerchio: " + pC);
		return pC;
	}

	public int calcolaPunteggioT() {
		int pT = 0;
		if(!(torreTriangolo.isEmpty())) {
			for(Carta c : torreTriangolo) {
				if(c.getSimbolo().equals(Simbolo.T)) {
					pT += c.getValore().getVal();
				}
			}
			if(torreTriangolo.peek().getValore().equals(Valore.CIMA)) {
				pT =  pT*2;
			}

		}
		System.out.println("punteggio torre Triangolo: " + pT);
		return pT;
	}

	public int calcolaPunteggioTotale() {
		punteggio = calcolaPunteggioA()+calcolaPunteggioC()+calcolaPunteggioQ()+calcolaPunteggioT();
		return punteggio;
	}

}
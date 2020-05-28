//package towers_of_wisdom;
//
//import java.util.Stack;
//
//public class Torre {
//
//	private Stack<Carta> torreQuadrato = new Stack<Carta>();
//	private Stack<Carta> torreTriangolo = new Stack<Carta>();
//	private Stack<Carta> torreCerchio = new Stack<Carta>();
//	private Stack<Carta> torreAncora = new Stack<Carta>();
//
//	private int punteggio;
//
//	public Torre() {
//
//	}
//
//	protected Stack<Carta> getTorreQuadrato() {
//		return torreQuadrato;
//	}
//
//	protected Stack<Carta> getTorreTriangolo() {
//		return torreTriangolo;
//	}
//
//	protected Stack<Carta> getTorreCerchio() {
//		return torreCerchio;
//	}
//
//	protected Stack<Carta> getTorreAncora() {
//		return torreAncora;
//	}
//
//	protected int getPunteggio() {
//		return punteggio;
//	}
//
//	public int calcolaPunteggioA(Carta carta) {
//		int pA = 0;
//		if(torreAncora.contains(carta)) {
//			for(int i=0; i<torreAncora.size(); i++) {
//				pA += torreAncora.get(i).getValore().getVal();
//			}
//			if(torreAncora.peek().getValore().equals(Valore.CIMA)) {
//				return pA*2;
//			}
//			System.out.println("Punteggio torre Ancora: " + pA);
//		}
//		return pA;
//	}
//
//	public int calcolaPunteggioQ(Carta carta) {
//		int pQ = 0;
//		if(torreQuadrato.contains(carta)) {
//			for(int i=0; i<torreQuadrato.size(); i++) {
//				pQ += torreQuadrato.get(i).getValore().getVal();
//			}
//			if(torreQuadrato.peek().getValore().equals(Valore.CIMA)) {
//				return pQ*2;
//			}
//			System.out.println("Punteggio torre Ancora: " + pQ);
//		}
//		return pQ;
//	}
//
//	public int calcolaPunteggioC(Carta carta) {
//		int pC = 0;
//		if(torreCerchio.contains(carta)) {
//			for(int i=0; i<torreCerchio.size(); i++) {
//				pC += torreCerchio.get(i).getValore().getVal();
//			}
//			if(torreAncora.peek().getValore().equals(Valore.CIMA)) {
//				return pC*2;
//			}
//			System.out.println("Punteggio torre Ancora: " + pC);
//		}
//		return pC;
//	}
//
//	public int calcolaPunteggioT(Carta carta) {
//		int pT = 0;
//		if(torreTriangolo.contains(carta)) {
//			for(int i=0; i<torreTriangolo.size(); i++) {
//				pT += torreTriangolo.get(i).getValore().getVal();
//			}
//			if(torreTriangolo.peek().getValore().equals(Valore.CIMA)) {
//				return pT*2;
//			}
//			System.out.println("Punteggio torre Ancora: " + pT);
//		}
//		return pT;
//	}
//
//	public int calcolaPunteggioTotale(Carta carta) {
//		punteggio = calcolaPunteggioA(carta)+calcolaPunteggioC(carta)+calcolaPunteggioQ(carta)+calcolaPunteggioT(carta);
//		return punteggio;
//	}
//	
//	@Override
//	public String toString() {
//		return "Torre [torreQuadrato=" + torreQuadrato + ", torreTriangolo=" + torreTriangolo + ", torreCerchio="
//				+ torreCerchio + ", torreAncora=" + torreAncora + ", punteggio=" + punteggio + "]";
//	}
//
//}

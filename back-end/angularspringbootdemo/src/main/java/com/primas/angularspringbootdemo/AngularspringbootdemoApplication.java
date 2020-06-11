package com.primas.angularspringbootdemo;


import java.util.ArrayList;

import org.springframework.beans.BeansException;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Bean;


import com.primas.angularspringbootdemo.entity.Partita;

import com.primas.angularspringbootdemo.repository.RepositoryPartita;

@SpringBootApplication
public class AngularspringbootdemoApplication implements ApplicationContextAware{
	private static ApplicationContext context;
//	@SuppressWarnings("unchecked")
	public static void main(String[] args) {
		SpringApplication.run(AngularspringbootdemoApplication.class, args);
	
		//TorriDiSaggezza tds = new TorriDiSaggezza();
		
//		AnnotationConfigApplicationContext context= new AnnotationConfigApplicationContext(ConfiguratoreSpring.class);
//		TorriDiSaggezza tds = (TorriDiSaggezza) context.getBean("datiPartita");
		

//		ArrayList<Carta> mc1 = (ArrayList<Carta>) context.getBean("mazzo");
//		ArrayList<Carta> ms1 = (ArrayList<Carta>) context.getBean("scarti");
//		System.out.println("Mazzo Coperto:" + mc1);
//		System.out.println("Mazzo Scarti:" + ms1);
		
		//TODO gestire in maniera asincrona la chiusura del context 
//		tds.giocaPartita();
//		context.close();
	}
	
	@Bean
	CommandLineRunner init(RepositoryPartita partitaRepository) {
		return args -> {
//			Giocatore giocatore = new GiocatoreBot();
//			Giocatore giocatore2 = new GiocatoreBot();
			
			
			
//			Torre torreQ = new Torre(Simbolo.Q);
//			HashMap<Simbolo, Torre> torri = new HashMap<>();
//			torri.put(Simbolo.Q, torreQ);
			//InsiemeTorri insTorri = new InsiemeTorri();
			//insTorri.setTorriCarte(torri);
			//giocatore.setInsTorri(insTorri);
//			Stream.of("Bob", "Lil", "Art", "Susy", "Tess").forEach(name -> {
//				GiocatoreBot giocatore = new GiocatoreBot(name);
//				giocatoreRepository.save(giocatore);
//			});
			Partita partita = new Partita("Marco", "Tizio");
			
			partitaRepository.save(partita);
			partitaRepository.findAll().forEach(System.out::println);//i giocaotri vanno salvati a partire dall'interfaccia 
		};
	}

	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		// TODO Auto-generated method stub
		context = applicationContext;
	}
	

}

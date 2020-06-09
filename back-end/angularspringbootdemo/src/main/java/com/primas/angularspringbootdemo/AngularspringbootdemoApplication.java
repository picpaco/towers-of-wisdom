package com.primas.angularspringbootdemo;


import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.primas.angularspringbootdemo.entity.Giocatore;
import com.primas.angularspringbootdemo.entity.GiocatoreBot;
import com.primas.angularspringbootdemo.entity.Partita;
import com.primas.angularspringbootdemo.entity.TorriDiSaggezza;
import com.primas.angularspringbootdemo.repository.RepositoryPartita;

@SpringBootApplication
public class AngularspringbootdemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(AngularspringbootdemoApplication.class, args);
		TorriDiSaggezza tds = new TorriDiSaggezza();

		tds.giocaPartita();
	}

	@Bean
	CommandLineRunner init(RepositoryPartita partitaRepository) {
		return args -> {
			Giocatore giocatore = new GiocatoreBot("Marco");
			Giocatore giocatore2 = new GiocatoreBot("Tizio");
			
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
	

}

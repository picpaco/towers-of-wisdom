package com.primas.angularspringbootdemo;

import java.util.HashMap;
import java.util.stream.Stream;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.primas.angularspringbootdemo.entity.Giocatore;
import com.primas.angularspringbootdemo.entity.GiocatoreBot;
import com.primas.angularspringbootdemo.entity.Simbolo;
import com.primas.angularspringbootdemo.entity.Torre;
import com.primas.angularspringbootdemo.repository.RepositoryPartita;

@SpringBootApplication
public class AngularspringbootdemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(AngularspringbootdemoApplication.class, args);
	}

	@Bean
	CommandLineRunner init(RepositoryPartita giocatoreRepository) {
		return args -> {
			Giocatore giocatore = new GiocatoreBot("Marco");
			Torre torreQ = new Torre(Simbolo.Q);
			HashMap<Simbolo, Torre> torri = new HashMap<>();
			torri.put(Simbolo.Q, torreQ);
			//InsiemeTorri insTorri = new InsiemeTorri();
			//insTorri.setTorriCarte(torri);
			//giocatore.setInsTorri(insTorri);
//			Stream.of("Bob", "Lil", "Art", "Susy", "Tess").forEach(name -> {
//				GiocatoreBot giocatore = new GiocatoreBot(name);
//				giocatoreRepository.save(giocatore);
//			});
			//giocatoreRepository.save(giocatore);
			giocatoreRepository.findAll().forEach(System.out::println);//i giocaotri vanno salvati a partire dall'interfaccia 
		};
	}
	

}

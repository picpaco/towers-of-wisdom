package com.primas.angularspringbootdemo;

import java.util.stream.Stream;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.primas.angularspringbootdemo.entity.GiocatoreBot;
import com.primas.angularspringbootdemo.repository.RepositoryGiocatore;

@SpringBootApplication
public class AngularspringbootdemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(AngularspringbootdemoApplication.class, args);
	}

	@Bean
	CommandLineRunner init(RepositoryGiocatore giocatoreRepository) {
		return args -> {
			Stream.of("Bob", "Lil", "Art", "Susy", "Tess").forEach(name -> {
				GiocatoreBot giocatore = new GiocatoreBot(name);
				giocatoreRepository.save(giocatore);
			});
			giocatoreRepository.findAll().forEach(System.out::println);//i giocaotri vanno salvati a partire dall'interfaccia 
		};
	}

}

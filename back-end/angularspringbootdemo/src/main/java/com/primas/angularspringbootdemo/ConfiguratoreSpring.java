package com.primas.angularspringbootdemo;

import java.util.ArrayList;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.primas.angularspringbootdemo.entity.Carta;

import com.primas.angularspringbootdemo.entity.Giocatore;
import com.primas.angularspringbootdemo.entity.GiocatoreUmano;
import com.primas.angularspringbootdemo.entity.Mazzo;
import com.primas.angularspringbootdemo.entity.MazzoCoperto;
import com.primas.angularspringbootdemo.entity.MazzoScarti;

@Configuration
public class ConfiguratoreSpring {

	private MazzoCoperto mazzoCoperto = new MazzoCoperto();
	private Mazzo mazzoScarti = new MazzoScarti();
	
	private Giocatore gioc = new GiocatoreUmano("Tizio");


	
	@Bean(name="mazzo")
	public ArrayList<Carta> getMazzoCoperto(){
		//System.out.println("le carte del mazzo di tizio sono: "+mazzoCoperto.getListaCarte()+mazzoCoperto.getListaCarte().size());
		return mazzoCoperto.getListaCarte();
	}

	@Bean(name="scarti")
	public ArrayList<Carta> getMazzoScarti(){
		//System.out.println("mazzo scarti tizio"+mazzoScarti.getListaCarte());
		return mazzoScarti.getListaCarte();
	}
	
	
}

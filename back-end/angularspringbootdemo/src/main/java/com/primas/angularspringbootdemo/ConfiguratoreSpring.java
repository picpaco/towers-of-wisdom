package com.primas.angularspringbootdemo;

import java.util.ArrayList;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.primas.angularspringbootdemo.entity.Carta;

import com.primas.angularspringbootdemo.entity.Mazzo;
import com.primas.angularspringbootdemo.entity.MazzoCoperto;
import com.primas.angularspringbootdemo.entity.MazzoScarti;

@Configuration
public class ConfiguratoreSpring {

	private Mazzo mazzoCoperto = new MazzoCoperto();
	private Mazzo mazzoScarti = new MazzoScarti();
	
	@Bean(name="mazzo")
	public ArrayList<Carta> getMazzoCoperto(){
		return mazzoCoperto.getListaCarte();
	}

	@Bean(name="scarti")
	public ArrayList<Carta> getMazzoScarti(){
		return mazzoScarti.getListaCarte();
	}
	
//	@Bean(name="dati")
//	public DatiPartitaInCorso getDatiPartitaInCorso() {
//		return new DatiPartitaInCorso();
//	}
	
}

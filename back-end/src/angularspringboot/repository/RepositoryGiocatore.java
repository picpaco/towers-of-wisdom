package com.primas.angularspringboot.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.primas.angularspringboot.entity.Giocatore;

@Repository
public interface RepositoryGiocatore extends CrudRepository<Giocatore, Long> {
}
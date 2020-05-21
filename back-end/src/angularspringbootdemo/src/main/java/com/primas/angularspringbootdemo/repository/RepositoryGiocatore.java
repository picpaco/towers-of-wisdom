package com.primas.angularspringbootdemo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.primas.angularspringbootdemo.entity.Giocatore;

@Repository
public interface RepositoryGiocatore extends CrudRepository<Giocatore, Long> {
}
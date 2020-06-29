package com.primas.angularspringbootdemo.repository;

import org.springframework.data.repository.CrudRepository;

import com.primas.angularspringbootdemo.entity.LeaderboardEntry;


public interface ClassificaRepository extends CrudRepository<LeaderboardEntry, Long> {

}

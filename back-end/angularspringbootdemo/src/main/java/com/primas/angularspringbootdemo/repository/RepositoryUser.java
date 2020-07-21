package com.primas.angularspringbootdemo.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.primas.angularspringbootdemo.entity.User;


@Repository
public interface RepositoryUser extends CrudRepository<User, Long> {
	@Query("SELECT u FROM User u WHERE u.username = :username ")
    public User getUserByUsername(@Param("username") String username);
}

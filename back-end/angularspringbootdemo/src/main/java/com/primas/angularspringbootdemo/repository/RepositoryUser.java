package com.primas.angularspringbootdemo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.primas.angularspringbootdemo.entity.DAOUser;



@Repository
public interface RepositoryUser extends CrudRepository<DAOUser, String> {
	//@Query("SELECT u FROM User u WHERE u.username = :username ")
    public DAOUser getUserByUsername(@Param("username") String username);
}

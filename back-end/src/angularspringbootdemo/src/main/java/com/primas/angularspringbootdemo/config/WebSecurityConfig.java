package com.primas.angularspringbootdemo.config;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;


@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		System.out.println("sto dentro il metodo configure(http)");
//		http
//			.authorizeRequests()
//				.antMatchers("/", "/home").permitAll()
//				.anyRequest().authenticated()
//				.and()
//			.formLogin()
//				.loginPage("/login")
//				.permitAll()
//				.and()
//			.logout()
//				.permitAll();
		
		http.csrf().disable().
		authorizeRequests().
		antMatchers(HttpMethod.OPTIONS, "/**").
		permitAll().
		anyRequest().
		authenticated()
		.and().httpBasic();
	}
	
	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		System.out.println("sto dentro il metodo configureGlobal(auth)");
		auth.inMemoryAuthentication().
		withUser("stefano89").password("{noop}stefanorusso").roles("USER");
	}

//	@Bean
//	@Override
//	public UserDetailsService userDetailsService() {
//		UserDetails user =
//			 User.withDefaultPasswordEncoder()
//				.username("user")
//				.password("password")
//				.roles("USER")
//				.build();
//
//		return new InMemoryUserDetailsManager(user);
//	}
}

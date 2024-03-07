package com.project.questapp.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.project.questapp.entities.User;
import com.project.questapp.responses.HttpResponse;
import com.project.questapp.responses.UserResponse;
import com.project.questapp.services.UserService;
import com.project.questapp.exceptions.UserNotFoundException;

@RestController
@RequestMapping(path="/users")
public class UserController {
	
	private UserService userService;
	
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	@GetMapping
	public List<User> getAllUsers(){
		return userService.getAllUsers();
	}
	
	@PostMapping
	public User createUser(@RequestBody User newUser) {
		return userService.saveOneUser(newUser);
	}
	
	@GetMapping(path="/{userId}")
	public UserResponse getOneUser(@PathVariable Long userId) {
		User user = userService.getOneUserById(userId);
		if (user == null) {
			throw new UserNotFoundException("Böyle bir kullanıcı bulunmamakta");
		}
		return new UserResponse(user);
	}
	
	@PutMapping("/{userId}")
	public User updateOneUser(@PathVariable Long userId,@RequestBody User newUser) {
		return userService.updateOneUser(userId, newUser);
	}
	
	@DeleteMapping("/{userId}")
	public void deleteOneUser(@PathVariable Long userId) {
		userService.deleteOneUser(userId);
	}
	
	@GetMapping("/activity/{userId}")
	public List<Object> getUserActivity(@PathVariable Long userId){
		return userService.getUserActivity(userId);
	}

	@ExceptionHandler(UserNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ResponseBody
	private HttpResponse handleUserNotFound() {
		return new HttpResponse("Böyle bir kullanıcı bulunmamakta");
	}
	
}


































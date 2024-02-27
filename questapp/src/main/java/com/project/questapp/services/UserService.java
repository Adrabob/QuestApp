package com.project.questapp.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.project.questapp.entities.Comment;
import com.project.questapp.entities.Like;
import com.project.questapp.entities.User;
import com.project.questapp.repos.CommentRepository;
import com.project.questapp.repos.LikeRepository;
import com.project.questapp.repos.PostRepository;
import com.project.questapp.repos.UserRepository;
import com.project.questapp.responses.CommentResponse;

@Service
public class UserService {
	
	UserRepository userRepository;
	LikeRepository likeRepository;
	CommentRepository commentRepository;
	PostRepository postRepository;
	
	public UserService(UserRepository userRepository, LikeRepository likeRepository, CommentRepository commentRepository,PostRepository postRepository) {
		this.userRepository = userRepository;
		this.likeRepository = likeRepository;
		this.commentRepository = commentRepository;
		this.postRepository = postRepository;
		
	}
	
	public List<User> getAllUsers(){
		return userRepository.findAll();
	}
	
	public User saveOneUser(User newUser) {
		return userRepository.save(newUser);
	}
	
	public User getOneUserById(Long userId) {
		return userRepository.findById(userId).orElse(null);
	}
	
	public User updateOneUser(Long userId,User newUser) {
		Optional<User> user = userRepository.findById(userId);
		if(user.isPresent()) {
			User foundUser = user.get();
			foundUser.setUserName(newUser.getUserName());
			foundUser.setPassword(newUser.getPassword());
			userRepository.save(foundUser);
			return foundUser;
		}else {
			return null;
		}
	}
	
	public void deleteOneUser(Long userId) {
		userRepository.deleteById(userId);
	}

	public User getOneUserByUserName(String username) {
		return userRepository.findByUserName(username);
	}

	public List<Object> getUserActivity(Long userId) {
		List<Long> postsIds = postRepository.findTopByUserId(userId);
		if(postsIds.isEmpty()) {
			return null;
		}else {
		List<Comment> comments = commentRepository.findUserCommentByPostId(postsIds);
		List<Like> likes = likeRepository.findUserLikesByPostId(postsIds);
		List<Object> result = new ArrayList<>();
		result.addAll(comments);
		result.addAll(likes);
		return result;
		}
	}
}









package com.project.questapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.project.questapp.entities.Like;
import com.project.questapp.entities.Post;
import com.project.questapp.entities.User;
import com.project.questapp.repos.LikeRepository;
import com.project.questapp.requests.LikeCreateRequest;

@Service
public class LikeService {

	private LikeRepository likeRepository;
	private UserService userService;
	private PostService postService;

	

	public LikeService(LikeRepository likeRepository, UserService userService, PostService postService) {
		this.likeRepository = likeRepository;
		this.userService = userService;
		this.postService = postService;
	}

	//@GetMapping for get all likes
	public List<Like> getAllLikes(Optional<Long> postId, Optional<Long> userId) {
		
		if(userId.isPresent() && postId.isPresent()){
			return likeRepository.findByUserIdAndPostId(postId.get(), userId.get());
		}else if(postId.isPresent() && !userId.isPresent()) {
			return likeRepository.findByPostId(postId.get());
		}else if(userId.isPresent() && !postId.isPresent()){
			return likeRepository.findByUserId(userId.get());
		}else {
			return likeRepository.findAll();
		}
	}

	//@GetMapping("/{likeId}") 
	public Like getOneLikeById(Long likeId) {
		return likeRepository.findById(likeId).orElse(null);
	}

	//@PostMapping
	public Like createOneLike(LikeCreateRequest request) {
		User user = userService.getOneUserById (request.getUserId());
		Post post = postService.getOnePostById (request.getPostId());
		if(user != null && post != null) {
			Like toSaveLike = new Like();
			toSaveLike.setId(request.getId());
			toSaveLike.setUser(user);
			toSaveLike.setPost(post);
			return likeRepository.save(toSaveLike);
		}else 
			return null;
	}

	public void deleteOneLike(Long likeId) {
		likeRepository.deleteById(likeId);
	}
	
	
}

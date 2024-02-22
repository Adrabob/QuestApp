package com.project.questapp.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.project.questapp.entities.Like;
import com.project.questapp.entities.Post;
import com.project.questapp.entities.User;
import com.project.questapp.repos.LikeRepository;
import com.project.questapp.requests.LikeCreateRequest;
import com.project.questapp.responses.LikeResponse;

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
	public List<LikeResponse> getAllLikes(Optional<Long> postId, Optional<Long> userId) {
		List<Like> list;
		if(userId.isPresent() && postId.isPresent()){
			list = likeRepository.findByUserIdAndPostId(postId.get(), userId.get());
		}else if(postId.isPresent()) {
			list = likeRepository.findByPostId(postId.get());
		}else if(userId.isPresent()){
			list = likeRepository.findByUserId(userId.get());
		}else 
			list =  likeRepository.findAll();
		return list.stream().map(like -> new LikeResponse(like)).collect(Collectors.toList());
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

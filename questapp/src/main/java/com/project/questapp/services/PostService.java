package com.project.questapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.project.questapp.entities.Post;
import com.project.questapp.entities.User;
import com.project.questapp.repos.PostRepository;
import com.project.questapp.requests.PostCreateRequest;
import com.project.questapp.requests.PostUpdateRequest;

@Service
public class PostService {

	private PostRepository postRepository;
	private UserService userService;
	
	
	public PostService(PostRepository postRepository, UserService userService) {
		this.postRepository = postRepository;
		this.userService = userService;
	}

	
	//GetMapping
	public List<Post> getAllPosts(Optional<Long> userId) {
		if(userId.isPresent()) {
			return postRepository.findByUserId(userId.get());
		}else
		return postRepository.findAll();
	}

	//GetMapping
	public Post getOnePostById(Long postId) {
		return postRepository.findById(postId).orElse(null);
	}

	//PostMapping Annotation
	public Post createOnePost(PostCreateRequest newPostRequest) {
		
		User user = userService.getOneUserById(newPostRequest.getUserId());
		if(user == null) {
			return null;
		}else {
			Post toSave = new Post();
			toSave.setId(newPostRequest.getId());
			toSave.setText(newPostRequest.getText());
			toSave.setTitle(newPostRequest.getTitle());
			toSave.setUser(user);
			return postRepository.save(toSave);
		}
		
	}

	//PutMapping Annotation
	public Post updateOnePostById(Long postId, PostUpdateRequest updatePostUpdateRequest) {
		Optional<Post> post = postRepository.findById(postId);
		if(post.isPresent()) {
			Post toUpdate = post.get();
			toUpdate.setText(updatePostUpdateRequest.getText());
			toUpdate.setTitle(updatePostUpdateRequest.getTitle());
			return postRepository.save(toUpdate);
		}else {
			return null;
		}
	}

	//DeleteMapping Annotation
	public void deleteOnePostById(Long postId) {
		postRepository.deleteById(postId);
		
	}
	
	
}







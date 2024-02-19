package com.project.questapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;


import com.project.questapp.entities.Comment;
import com.project.questapp.entities.Post;
import com.project.questapp.entities.User;
import com.project.questapp.repos.CommentRepository;
import com.project.questapp.requests.CommentCreateRequest;
import com.project.questapp.requests.CommentUpdateRequest;

@Service
public class CommentService {

	private CommentRepository commentRepository;
	private UserService userService;
	private PostService postService;
	
	
	
	public CommentService(CommentRepository commentRepository, UserService userService, PostService postService) {
		this.commentRepository = commentRepository;
		this.userService = userService;
		this.postService = postService;
	}

	//Comment GetMapping Annotations
	public List<Comment> getAllComments(Optional<Long> postId, Optional<Long> userId) {
	
		if(userId.isPresent() && postId.isPresent()){
			return commentRepository.findByUserIdAndPostId(postId.get(), userId.get());
		}else if(postId.isPresent() && !userId.isPresent()) {
			return commentRepository.findByPostId(postId.get());
		}else if(userId.isPresent() && !postId.isPresent()){
			return commentRepository.findByUserId(userId.get());
		}else {
			return commentRepository.findAll();
		}
	}

	// GetMapping("/{commentId}")
	public Comment getOneCommentById(Long commentId) {
		return commentRepository.findById(commentId).orElse(null);
	}
	
	//PostMapping for create new post
	public Comment createOneComment(CommentCreateRequest newCommentCreateRequest) {
		User user = userService.getOneUserById (newCommentCreateRequest.getUserId());
		Post post = postService.getOnePostById (newCommentCreateRequest.getPostId());
		if(user != null && post != null) {
			Comment toSaveComment = new Comment();
			toSaveComment.setId(newCommentCreateRequest.getId());
			toSaveComment.setText(newCommentCreateRequest.getText());
			toSaveComment.setUser(user);
			toSaveComment.setPost(post);
			return commentRepository.save(toSaveComment);
		}else 
			return null;
	}

	//PutMapping("/{commentId}") for update comment
	public Comment updateOneComment(Long commentId, CommentUpdateRequest request) {
		Optional<Comment> comment = commentRepository.findById(commentId);
		if(comment.isPresent()) {
			Comment toUpdate = comment.get();
			toUpdate.setText(request.getText());
			return commentRepository.save(toUpdate);
		}else
		return null;
	}
	
	//DeleteMapping("/{commentId}") for delete comment
	public void deleteOneComment(Long commentId) {
		commentRepository.deleteById(commentId);
	}

}

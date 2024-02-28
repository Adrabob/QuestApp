package com.project.questapp.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.questapp.entities.Comment;


public interface CommentRepository extends JpaRepository<Comment, Long> {

	List<Comment> findByPostId(Long postId);

	List<Comment> findByUserId(Long userId);

	List<Comment> findByUserIdAndPostId(Long userId, Long postId);
	
	@Query(value="select 'commented on', c.post_id, u.avatar, u.user_name from " 
			+ "comment c left join user u on u.id = c.user_id "
			+ "where c.post_id in :postsIds limit 5", nativeQuery = true)
	List<Object> findUserCommentByPostId(@Param("postsIds") List<Long> postsIds);
}

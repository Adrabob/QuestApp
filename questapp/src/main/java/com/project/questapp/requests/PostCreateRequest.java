package com.project.questapp.requests;

import lombok.Data;

@Data
public class PostCreateRequest {
	
	//For PostMapping Annotation
	Long id;
	String text;
	String title;
	Long userId;
}

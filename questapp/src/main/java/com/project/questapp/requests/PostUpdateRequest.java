package com.project.questapp.requests;

import lombok.Data;

@Data
public class PostUpdateRequest {
	
	//For PutMapping Annotation
	String text;
	String title;
}

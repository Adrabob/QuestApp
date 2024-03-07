package com.project.questapp.responses;

import lombok.Data;

@Data
public class HttpResponse {

	 String message;
	
	 public HttpResponse(String message) {
		 this.message = message;
	 }
}

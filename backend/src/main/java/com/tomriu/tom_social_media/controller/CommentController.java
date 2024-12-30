package com.tomriu.tom_social_media.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tomriu.tom_social_media.models.Comment;
import com.tomriu.tom_social_media.models.User;
import com.tomriu.tom_social_media.service.CommentService;
import com.tomriu.tom_social_media.service.UserService;

@RestController
@RequestMapping("/api")
public class CommentController {

	@Autowired
	private CommentService commentService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/comments/post/{postId}")
	public Comment createComment(@RequestHeader("Authorization") String jwt, 
			@RequestBody Comment comment, 
			@PathVariable Integer postId) throws Exception {
		
		User user = userService.findUserByJwt(jwt);
		
		Comment createdComment = commentService.createComment(comment, 
				postId, user.getId());
		
		return createdComment;
	}
	
	@PutMapping("/comments/like/{commentId}")
	public Comment createComment(@RequestHeader("Authorization") String jwt,  
			@PathVariable Integer commentId) throws Exception {
		
		User user = userService.findUserByJwt(jwt);
		
		Comment likedComment = commentService.likeComment(commentId, user.getId());
		
		return likedComment;
	}
	
	
}

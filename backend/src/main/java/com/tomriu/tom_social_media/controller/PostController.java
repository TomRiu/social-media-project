package com.tomriu.tom_social_media.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tomriu.tom_social_media.dto.response.ApiResponse;
import com.tomriu.tom_social_media.models.Post;
import com.tomriu.tom_social_media.models.User;
import com.tomriu.tom_social_media.service.PostService;
import com.tomriu.tom_social_media.service.UserService;

@RestController
@RequestMapping("/api")
public class PostController {
	
	@Autowired
	PostService postService;
	
	@Autowired
	UserService userService;
	
	@PostMapping("/posts")
	public ResponseEntity<Post> createPost(
			@RequestHeader("Authorization") String jwt, 
			@RequestBody Post post) throws Exception {
		
		User reqUser = userService.findUserByJwt(jwt);
		
		Post createdPost = postService.createNewPost(post, reqUser.getId());
		
		return new ResponseEntity<>(createdPost, HttpStatus.ACCEPTED);
	}
	
	@DeleteMapping("/posts/{postId}")
	public ResponseEntity<ApiResponse> deletePost(
			@PathVariable Integer postId, 
			@RequestHeader("Authorization") String jwt) throws Exception {
		
		User reqUser = userService.findUserByJwt(jwt);
		
		String message = postService.deletePost(postId, reqUser.getId());
		ApiResponse res = new ApiResponse(message, true);
		
		return new ResponseEntity<ApiResponse>(res, HttpStatus.OK);
	}
	
	@GetMapping("/posts/{postId}")
	public ResponseEntity<Post> findPostByIdHandler(@PathVariable Integer postId) throws Exception {
		
		Post post = postService.findPostById(postId);
		
		return new ResponseEntity<Post>(post, HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/posts/user/{userId}")
	public ResponseEntity<List<Post>> findUsersPosts(@PathVariable Integer userId) {
		
		List<Post> posts = postService.findPostByUserId(userId);
		
		return new ResponseEntity<List<Post>>(posts, HttpStatus.OK);
	}
	
	@GetMapping("/posts") 
	public ResponseEntity<List<Post>> findAllPosts() {
		
		List<Post> posts = postService.findAllPost();
		
		return new ResponseEntity<List<Post>>(posts, HttpStatus.OK);
	}
	
	@PutMapping("/posts/like/{postId}")
	public ResponseEntity<Post> likePostHandler(
			@PathVariable Integer postId, 
			@RequestHeader("Authorization") String jwt) throws Exception {
		
		User reqUser = userService.findUserByJwt(jwt);
		
		Post post = postService.likePost(postId, reqUser.getId());
		
		return new ResponseEntity<Post>(post, HttpStatus.ACCEPTED);
	}
}

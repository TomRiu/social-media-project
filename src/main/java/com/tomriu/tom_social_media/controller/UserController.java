package com.tomriu.tom_social_media.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tomriu.tom_social_media.dto.response.UserProfileResponse;
import com.tomriu.tom_social_media.models.User;
import com.tomriu.tom_social_media.repository.UserRepository;
import com.tomriu.tom_social_media.service.PostService;
import com.tomriu.tom_social_media.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

	final UserRepository userRepository;
	
	final UserService userService;
	
	final PostService postService;
	
	@GetMapping("/users")
	public List<User> getUsers() {
		
		List<User> users = userRepository.findAll();
		return users;
	}
	
	@GetMapping("/users/{userId}")
	public User getUserById(@PathVariable Integer userId) throws Exception {
		
		User user = userService.findUserById(userId);
		return user;
	}
	
	@PutMapping("/users")
	public User updateUser(@RequestHeader("Authorization") String jwt, @RequestBody User user) throws Exception {
		
		User reqUser = userService.findUserByJwt(jwt);
		
		User updatedUser = userService.updateUser(user, reqUser.getId());
		return updatedUser;
	}
	
	@PutMapping("/users/follow/{userId2}")
	public User followUserHandler(@RequestHeader("Authorization") String jwt, @PathVariable Integer userId2) throws Exception {
		
		User reqUser = userService.findUserByJwt(jwt);
		
		User user = userService.followUser(reqUser.getId(), userId2);
		return user;
	}
	
	@GetMapping("/users/search")
	public List<User> searchUser(@RequestParam("query") String query) {
		
		List<User> users = userService.searchUser(query);
		return users;
	}
	
	@GetMapping("/users/profile")
	public ResponseEntity<?> getUserProfile(Authentication authentication) {
	    User currentUser = userService.findUserByEmail(authentication.getName());
	    UserProfileResponse profileResponse = new UserProfileResponse();
	    
	    profileResponse.setId(currentUser.getId());
	    profileResponse.setFirstName(currentUser.getFirstName());
	    profileResponse.setLastName(currentUser.getLastName());
	    profileResponse.setEmail(currentUser.getEmail());
	    profileResponse.setGender(currentUser.getGender());
	    profileResponse.setFollowersCount(currentUser.getFollowers().size());
	    profileResponse.setFollowingsCount(currentUser.getFollowings().size());
	    profileResponse.setPostsCount(postService.findPostByUserId(currentUser.getId()).size());
	    
	    return ResponseEntity.ok(profileResponse);
	}
}

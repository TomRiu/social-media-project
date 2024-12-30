package com.tomriu.tom_social_media.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tomriu.tom_social_media.models.Story;
import com.tomriu.tom_social_media.models.User;
import com.tomriu.tom_social_media.service.StoryService;
import com.tomriu.tom_social_media.service.UserService;

@RestController
@RequestMapping("/api")
public class StoryController {
	
	@Autowired
	private StoryService storyService;
	
	@Autowired
	private UserService userService;
	
	
	@PostMapping("/story")
	public Story createStory(
			@RequestHeader("Authorization") String jwt, 
			@RequestBody Story story) {
		User reqUser = userService.findUserByJwt(jwt);
		
		Story createStory = storyService.createStory(story, reqUser);
		
		return createStory;
	}
	
	@GetMapping("/story/user/{userId}")
	public List<Story> findUsersStory(@PathVariable Integer userId) {
		
		List<Story> stories = storyService.findStoryByUserId(userId);
		
		return stories;
	}
	
	
}

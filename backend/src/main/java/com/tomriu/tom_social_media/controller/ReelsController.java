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

import com.tomriu.tom_social_media.models.Reels;
import com.tomriu.tom_social_media.models.User;
import com.tomriu.tom_social_media.service.ReelsService;
import com.tomriu.tom_social_media.service.UserService;

@RestController
@RequestMapping("/api")
public class ReelsController {
	
	@Autowired
	private ReelsService reelsService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/reels")
	public Reels createReels(
			@RequestHeader("Authorization") String jwt, 
			@RequestBody Reels reel) {
		
		User reqUser = userService.findUserByJwt(jwt);
		
		Reels createdReel = reelsService.createReel(reel, reqUser);
		
		return createdReel;
	}
	
	@GetMapping("/reels")
	public List<Reels> findAllReels() {
		
		List<Reels> reels = reelsService.findAllReels();
		
		return reels;
	}
	
	@GetMapping("/reels/user/{userId}")
	public List<Reels> findUsersReels(@PathVariable Integer userId) {
		
		List<Reels> reels = reelsService.findUsersReel(userId);
		
		return reels;
	}
}

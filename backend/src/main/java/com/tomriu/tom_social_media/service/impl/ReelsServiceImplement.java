package com.tomriu.tom_social_media.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tomriu.tom_social_media.models.Reels;
import com.tomriu.tom_social_media.models.User;
import com.tomriu.tom_social_media.repository.ReelsRepository;
import com.tomriu.tom_social_media.service.ReelsService;
import com.tomriu.tom_social_media.service.UserService;

@Service
public class ReelsServiceImplement implements ReelsService {

	@Autowired
	private ReelsRepository reelsRepository;
	
	@Autowired
	private UserService userService;
	
	@Override
	public Reels createReel(Reels reel, User user) {
		
		Reels createReel = new Reels();
		
		createReel.setTitle(reel.getTitle());
		createReel.setUser(user);
		createReel.setVideo(reel.getVideo());
		
		return reelsRepository.save(createReel);
	}

	@Override
	public List<Reels> findAllReels() {

		return reelsRepository.findAll();
	}

	@Override
	public List<Reels> findUsersReel(Integer userId) {
		
		return reelsRepository.findByUserId(userId);
	}

}

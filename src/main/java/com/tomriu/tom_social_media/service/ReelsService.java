package com.tomriu.tom_social_media.service;

import java.util.List;

import com.tomriu.tom_social_media.models.Reels;
import com.tomriu.tom_social_media.models.User;

public interface ReelsService {
	
	public Reels createReel(Reels reel, User user);
	
	public List<Reels> findAllReels();
	
	public List<Reels> findUsersReel(Integer userId);
}

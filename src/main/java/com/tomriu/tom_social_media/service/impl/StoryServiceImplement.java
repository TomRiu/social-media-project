package com.tomriu.tom_social_media.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tomriu.tom_social_media.models.Story;
import com.tomriu.tom_social_media.models.User;
import com.tomriu.tom_social_media.repository.StoryRepository;
import com.tomriu.tom_social_media.service.StoryService;

@Service
public class StoryServiceImplement implements StoryService {

	@Autowired
	private StoryRepository storyRepository;
	
	@Override
	public Story createStory(Story story, User user) {
		
		Story createdStory = new Story(); 
		
		createdStory.setCaption(story.getCaption());
		createdStory.setImage(story.getImage());
		createdStory.setUser(user);
		createdStory.setTimestamp(LocalDateTime.now());
		
		return storyRepository.save(createdStory);
	}

	@Override
	public List<Story> findStoryByUserId(Integer userId) {
		
		return storyRepository.findByUserId(userId);
	}
	
	
}

package com.tomriu.tom_social_media.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tomriu.tom_social_media.dto.request.CreateChatRequest;
import com.tomriu.tom_social_media.models.Chat;
import com.tomriu.tom_social_media.models.User;
import com.tomriu.tom_social_media.service.ChatService;
import com.tomriu.tom_social_media.service.UserService;

@RestController
@RequestMapping("/api")
public class ChatController {
	
	@Autowired
	private ChatService chatService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/chats")
	public Chat createdChat(
			@RequestHeader("Authorization") String jwt,
			@RequestBody CreateChatRequest req) throws Exception {
		
		User reqUser = userService.findUserByJwt(jwt);
		User user2 = userService.findUserById(req.getUserId());
		
		Chat chat = chatService.createChat(reqUser, user2);
		
		return chat;
	}
	
	@GetMapping("/chats")
	public List<Chat> findUsersChat(@RequestHeader("Authorization") String jwt) {
		
		User reqUser = userService.findUserByJwt(jwt);
		
		List<Chat> chats = chatService.findUsersChat(reqUser.getId());
		
		return chats;
	}
	
	
}

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

import com.tomriu.tom_social_media.models.Message;
import com.tomriu.tom_social_media.models.User;
import com.tomriu.tom_social_media.service.MessageService;
import com.tomriu.tom_social_media.service.UserService;

@RestController
@RequestMapping("/api")
public class MessageController {

	@Autowired
	private MessageService messageService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/messages/chat/{chatId}")
	public Message createMessage(
			@RequestHeader("Authorization") String jwt,
			@RequestBody Message req,
			@PathVariable Integer chatId) throws Exception {
		
		User user = userService.findUserByJwt(jwt);
		
		Message message = messageService.createMessage(user, chatId, req);
		return message;
	}
	
	@GetMapping("/messages/chat/{chatId}") 
	public List<Message> findChatsMessage(
			@RequestHeader("Authorization") String jwt,
			@PathVariable Integer chatId) throws Exception {
		
		List<Message> messages = messageService.findChatMessages(chatId);
		
		return messages;
	}
}

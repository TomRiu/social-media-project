package com.tomriu.tom_social_media.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tomriu.tom_social_media.models.Chat;
import com.tomriu.tom_social_media.models.Message;
import com.tomriu.tom_social_media.models.User;
import com.tomriu.tom_social_media.repository.ChatRepository;
import com.tomriu.tom_social_media.repository.MessageRepository;
import com.tomriu.tom_social_media.service.ChatService;
import com.tomriu.tom_social_media.service.MessageService;

@Service
public class MessageServiceImplementation implements MessageService {
	
	@Autowired
	private MessageRepository messageRepository;
	
	@Autowired
	private ChatService chatService;
	
	@Autowired
	private ChatRepository chatRepository;
	
	@Override
	public Message createMessage(User user, Integer chatId, Message req) throws Exception {
		
		Chat chat = chatService.findChatById(chatId);
		
		Message message = new Message();
		
		message.setChat(chat);
		message.setContent(req.getContent());
		message.setImage(req.getImage());
		message.setUser(user);
		message.setTimestamp(LocalDateTime.now());
		
		Message savedMessage = messageRepository.save(message);
		chatRepository.save(chat);
		
		return savedMessage;
	}

	@Override
	public List<Message> findChatMessages(Integer chatId) throws Exception {
		
		return messageRepository.findByChatId(chatId);
	}

	
}

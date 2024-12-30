package com.tomriu.tom_social_media.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tomriu.tom_social_media.models.Chat;
import com.tomriu.tom_social_media.models.User;
import com.tomriu.tom_social_media.repository.ChatRepository;
import com.tomriu.tom_social_media.service.ChatService;

@Service
public class ChatServiceImplementation implements ChatService {

	@Autowired
	private ChatRepository chatRepository;
	
	@Override
	public Chat createChat(User reqUser, User user2) {

		Chat isExist = chatRepository.findChatByUsersId(reqUser, user2);
		
		if (isExist != null) {
			return isExist;
		}
		Chat chat = new Chat();
		
		chat.getUsers().add(reqUser);
		chat.getUsers().add(user2);
		chat.setTimestamp(LocalDateTime.now());
		
		return chatRepository.save(chat);
	}

	@Override
	public Chat findChatById(Integer chatId) throws Exception {
		
		Optional<Chat> opt = chatRepository.findById(chatId);
		
		if (opt.isEmpty()) {
			throw new Exception("chat not found with id: " + chatId);
		}
		return opt.get();
	}

	@Override
	public List<Chat> findUsersChat(Integer userId) {
		
		return chatRepository.findByUsersId(userId);
	}
	
}

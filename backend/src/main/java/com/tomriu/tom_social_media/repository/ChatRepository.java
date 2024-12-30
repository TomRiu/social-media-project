package com.tomriu.tom_social_media.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tomriu.tom_social_media.models.Chat;
import com.tomriu.tom_social_media.models.User;

public interface ChatRepository extends JpaRepository<Chat, Integer> {
	
	public List<Chat> findByUsersId(Integer userId);
	
	@Query("SELECT c FROM Chat c WHERE :user MEMBER OF c.users AND :reqUser MEMBER OF c.users ")
	public Chat findChatByUsersId(@Param("user") User user, @Param("reqUser") User reqUser);
}

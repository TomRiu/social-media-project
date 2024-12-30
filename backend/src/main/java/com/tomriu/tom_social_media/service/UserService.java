package com.tomriu.tom_social_media.service;

import java.util.List;

import com.tomriu.tom_social_media.exceptions.UserException;
import com.tomriu.tom_social_media.models.Post;
import com.tomriu.tom_social_media.models.User;

public interface UserService {
	
	public User registerUser(User user);
	
	public User findUserById(Integer userId) throws UserException;
	
	public User findUserByEmail(String email);
	
	public User followUser(Integer userId1, Integer userId2) throws UserException;
	
	User unfollowUser(Integer reqUserId, Integer userId2) throws UserException;
	
	public User updateUser(User user, Integer userId) throws UserException;
	
	public List<User> searchUser(String query);
	
	public User findUserByJwt(String jwt);
	
	void createPasswordResetTokenForUser(User user, String token);
    
    User getUserByPasswordResetToken(String token) throws UserException;
    
    void changeUserPassword(User user, String newPassword);
   
    Post savePost(Integer userId, Integer postId) throws Exception;
}

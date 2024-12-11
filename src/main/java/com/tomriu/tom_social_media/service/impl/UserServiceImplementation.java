package com.tomriu.tom_social_media.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tomriu.tom_social_media.config.JwtProvider;
import com.tomriu.tom_social_media.exceptions.UserException;
import com.tomriu.tom_social_media.models.PasswordResetToken;
import com.tomriu.tom_social_media.models.Post;
import com.tomriu.tom_social_media.models.User;
import com.tomriu.tom_social_media.repository.PasswordResetTokenRepository;
import com.tomriu.tom_social_media.repository.PostRepository;
import com.tomriu.tom_social_media.repository.UserRepository;
import com.tomriu.tom_social_media.service.PostService;
import com.tomriu.tom_social_media.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImplementation implements UserService {

	final UserRepository userRepository;
	
	final PostRepository postRepository;
	
	final PasswordEncoder passwordEncoder;
	
	final PasswordResetTokenRepository passwordResetTokenRepository;

	@Override
	public User registerUser(User user) {
		User newUser = new User();
		newUser.setId(user.getId());
		newUser.setFirstName(user.getFirstName());
		newUser.setLastName(user.getLastName());
		newUser.setEmail(user.getEmail());
		newUser.setPassword(user.getPassword());

		User savedUser = userRepository.save(newUser);
		return savedUser;
	}

	@Override
	public User findUserById(Integer userId) throws UserException {
		Optional<User> user = userRepository.findById(userId);

		if (user.isPresent()) {
			return user.get();
		}

		throw new UserException("User not exist with user id: " + userId);
	}

	@Override
	public User findUserByEmail(String email) {
		User user = userRepository.findByEmail(email);
		return user;
	}

	@Override
	public User followUser(Integer reqUserId, Integer userId2) throws UserException {
		
		User reqUser = findUserById(reqUserId);
		
		User user2 = findUserById(userId2);
		
		user2.getFollowers().add(reqUser.getId());
		reqUser.getFollowings().add(user2.getId());
		
		userRepository.save(reqUser);
		userRepository.save(user2);
		
		return reqUser;
	}
	
	@Override
	public User unfollowUser(Integer reqUserId, Integer userId2) throws UserException {
		
		User reqUser = findUserById(reqUserId);
		
		User user2 = findUserById(userId2);
		
		user2.getFollowers().remove(reqUser.getId());
		reqUser.getFollowings().remove(user2.getId());
		
		userRepository.save(reqUser);
		userRepository.save(user2);
		
		return reqUser;
	}

	@Override
	public User updateUser(User user, Integer userId) throws UserException {
		Optional<User> user1 = userRepository.findById(userId);
		
		if(user1.isEmpty() ) {
			throw new UserException("User not exist with user id: " + userId);
		}
		
		User oldUser = user1.get();
		if(user.getFirstName() != null) {
			oldUser.setFirstName(user.getFirstName());
		}
		if(user.getLastName() != null) {
			oldUser.setLastName(user.getLastName());
		}
		if(user.getEmail() != null) {
			oldUser.setEmail(user.getEmail());
		}
		if(user.getPassword() != null) {
			oldUser.setPassword(passwordEncoder.encode(user.getPassword()));
		}
		if(user.getGender() != null) {
			oldUser.setGender(user.getGender());
		}
		User updatedUser = userRepository.save(oldUser);
		updatedUser.setPassword(null);
		return updatedUser;
	}

	@Override
	public List<User> searchUser(String query) {
		
		return userRepository.searchUser(query);
	}

	@Override
	public User findUserByJwt(String jwt) {
		String email = JwtProvider.getEmailFromJwtToken(jwt);
		
		User user = userRepository.findByEmail(email);
		return user;
	}
	
	@Override
    public void createPasswordResetTokenForUser(User user, String token) {
        PasswordResetToken myToken = new PasswordResetToken(token, user);
        passwordResetTokenRepository.save(myToken);
    }

    @Override
    public User getUserByPasswordResetToken(String token) throws UserException {
        PasswordResetToken passToken = passwordResetTokenRepository.findByToken(token);
        if (passToken == null) {
            throw new UserException("Invalid password reset token.");
        }
        if (passToken.getExpiryDate().isBefore(java.time.LocalDateTime.now())) {
            throw new UserException("Token has expired.");
        }
        return passToken.getUser();
    }

    @Override
    public void changeUserPassword(User user, String newPassword) {
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

	@Override
	public Post savePost(Integer userId, Integer postId) throws Exception {
	     
	     User user = findUserById(userId);
	     Optional<Post> postOtp = postRepository.findById(postId);
	     
	     if (!postOtp.isPresent()) {
	    	 throw new Exception("post not found with id " + postId);
	     }
	     Post post = postOtp.get();
	     
	     if (user.getSavedPosts().contains(post)) {
	    	 user.getSavedPosts().remove(post);
	     } else {
	    	 user.getSavedPosts().add(post);
	     }
	     
	     userRepository.save(user);
	     return post;
	}
	
	public List<Post> getSavedPosts(Integer userId) throws Exception {

        return findUserById(userId).getSavedPosts();
    }

}

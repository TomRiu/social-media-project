package com.tomriu.tom_social_media.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tomriu.tom_social_media.models.Post;
import com.tomriu.tom_social_media.models.User;
import com.tomriu.tom_social_media.repository.PostRepository;
import com.tomriu.tom_social_media.repository.UserRepository;
import com.tomriu.tom_social_media.service.PostService;
import com.tomriu.tom_social_media.service.UserService;

@Service
public class PostServiceImplementation implements PostService {

	@Autowired
	PostRepository postRepository;
	
	@Autowired
	UserService userService;
	
	@Autowired
	UserRepository userRepository;
	

	@Override
	public Post createNewPost(Post post, Integer userId) throws Exception {

		User user = userService.findUserById(userId);

		Post newPost = new Post();
		newPost.setCaption(post.getCaption());
		newPost.setImage(post.getImage());
		newPost.setCreatedAt(LocalDateTime.now());
		newPost.setVideo(post.getVideo());
		newPost.setUser(user);
		
		return postRepository.save(newPost);
	}

	@Override
	public String deletePost(Integer postId, Integer userId) throws Exception {
		
		Post post = findPostById(postId);
		User user = userService.findUserById(userId);
		
		if (post == null) {
			throw new Exception("Post does not exist " + postId);
		}
		else if (post.getUser().getId() != user.getId()) {
			throw new Exception("you can't delete another users post");
		}
		
	    List<User> usersWithSavedPost = userRepository.findUsersWithSavedPost(postId);

	    for (User u : usersWithSavedPost) {
	        u.getSavedPosts().remove(post);
	        userRepository.save(u);
	    }
		
		post.getLiked().clear();
		
		postRepository.delete(post);
		return "post deleted successfully";
	}

	@Override
	public List<Post> findPostByUserId(Integer userId) {
		
		return postRepository.findPostByUserId(userId);		
	}

	@Override
	public Post findPostById(Integer postId) throws Exception {
		Optional<Post> opt = postRepository.findById(postId);

		if (opt.isEmpty()) {
			throw new Exception("post not found with id " + postId);
		}
		return opt.get();
	}

	@Override
	public List<Post> findAllPost() {
		
		return postRepository.findAll();
	}

	@Override
	public Post likePost(Integer postId, Integer userId) throws Exception {
		
		Post post = findPostById(postId);
		User user = userService.findUserById(userId);
		
		if (post.getLiked().contains(user)) {
			post.getLiked().remove(user);
		} else {
			post.getLiked().add(user);
		}
		
		return postRepository.save(post);
	}

}

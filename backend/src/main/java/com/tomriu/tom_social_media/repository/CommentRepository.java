package com.tomriu.tom_social_media.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tomriu.tom_social_media.models.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

}

package com.tomriu.tom_social_media.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tomriu.tom_social_media.models.PasswordResetToken;
import com.tomriu.tom_social_media.models.User;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    PasswordResetToken findByToken(String token);
    PasswordResetToken findByUser(User user);
}


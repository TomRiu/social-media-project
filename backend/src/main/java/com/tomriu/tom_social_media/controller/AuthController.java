package com.tomriu.tom_social_media.controller;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tomriu.tom_social_media.config.JwtProvider;
import com.tomriu.tom_social_media.dto.request.LoginRequest;
import com.tomriu.tom_social_media.dto.request.PasswordResetRequest;
import com.tomriu.tom_social_media.dto.request.ResetPasswordRequest;
import com.tomriu.tom_social_media.dto.response.AuthResponse;
import com.tomriu.tom_social_media.exceptions.UserException;
import com.tomriu.tom_social_media.models.PasswordResetToken;
import com.tomriu.tom_social_media.models.User;
import com.tomriu.tom_social_media.repository.PasswordResetTokenRepository;
import com.tomriu.tom_social_media.repository.UserRepository;
import com.tomriu.tom_social_media.service.CustomerUserDetailsService;
import com.tomriu.tom_social_media.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
	
	private final UserService userService;
	
	private final PasswordEncoder passwordEncoder;
	
	private final CustomerUserDetailsService customerUserDetailsService;
	
	private final JavaMailSender mailSender;
	
	private final PasswordResetTokenRepository passwordResetTokenRepository;
	
	@PostMapping("/signup")
	public AuthResponse createUser(@RequestBody User user) throws Exception {	
		
		User isExist = userService.findUserByEmail(user.getEmail());
		
		if (isExist != null) {
			throw new Exception("This email already used with another account");
		}
		
		User newUser = new User();
		newUser.setId(user.getId());
		newUser.setFirstName(user.getFirstName());
		newUser.setLastName(user.getLastName());
		newUser.setEmail(user.getEmail());
		newUser.setPassword(passwordEncoder.encode(user.getPassword()));
		newUser.setGender(user.getGender());

		User savedUser = userService.registerUser(newUser);
		
		Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(), savedUser.getPassword());
		
		String token = JwtProvider.generateToken(authentication);
		
		AuthResponse res = new AuthResponse(token, "Register success");
		return res;
	}
	
	@PostMapping("/signin")
	public AuthResponse signin(@RequestBody LoginRequest loginRequest) {
		
		Authentication authentication = authenticate(loginRequest.getEmail(), loginRequest.getPassword());
		
		String token = JwtProvider.generateToken(authentication);
		
		AuthResponse res = new AuthResponse(token, "Login success");
		
		return res;
	}
	
	private Authentication authenticate(String email, String password) {
		
		UserDetails userDetails = customerUserDetailsService.loadUserByUsername(email);
		
		if (userDetails == null) {
			throw new BadCredentialsException("Invalid username");
		}
		if (!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("Password incorrect");
		}
		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}
	
	 @PostMapping("/forgot-password")
	    public AuthResponse forgotPassword(@RequestBody PasswordResetRequest passwordResetRequest) {
	        try {
	            User user = userService.findUserByEmail(passwordResetRequest.getEmail());
	            if (user == null) {
	                throw new UserException("User with this email does not exist.");
	            }

	            // Generate a random token
	            String token = UUID.randomUUID().toString();

	            // Create PasswordResetToken
	            userService.createPasswordResetTokenForUser(user, token);

	            // Construct reset URL
	            String resetUrl = "http://localhost:3000/reset-password?token=" + token;

	            // Send email
	            SimpleMailMessage message = new SimpleMailMessage();
	            message.setTo(user.getEmail());
	            message.setSubject("Password Reset Request");
	            message.setText("To reset your password, click the link below:\n" + resetUrl);
	            mailSender.send(message);

	            return new AuthResponse("Success", "Password reset email sent.");
	        } catch (UserException e) {
	            return new AuthResponse("Failure", e.getMessage());
	        } catch (Exception e) {
	            return new AuthResponse("Failure", "An error occurred while processing the request.");
	        }
	    }
	    
	    @PostMapping("/reset-password")
	    public AuthResponse resetPassword(@RequestBody ResetPasswordRequest resetPasswordRequest) {
	        try {
	            String token = resetPasswordRequest.getToken();
	            PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(token);
	            if (!passwordResetToken.isExpired()) {
	            	String newPassword = resetPasswordRequest.getNewPassword();

		            User user = userService.getUserByPasswordResetToken(token);
		            userService.changeUserPassword(user, newPassword);
		            
		            passwordResetToken.setExpiryDate(LocalDateTime.now());
		            
		            passwordResetTokenRepository.save(passwordResetToken);
		            
		            return new AuthResponse("Success", "Password has been successfully reset.");
	            } 
	            
	            passwordResetTokenRepository.delete(passwordResetToken);
	            
	            throw new UserException("Token is expired");
	        } catch (UserException e) {
	            return new AuthResponse("Failure", e.getMessage());
	        } catch (Exception e) {
	        	e.printStackTrace();
	            return new AuthResponse("Failure", "An error occurred while resetting the password.");
	        }
	    }
}

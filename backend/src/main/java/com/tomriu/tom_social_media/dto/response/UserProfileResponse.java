package com.tomriu.tom_social_media.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileResponse {
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private String gender;
    private List<Integer> followers;
    private List<Integer> followings;
    private Integer postsCount;
    
}
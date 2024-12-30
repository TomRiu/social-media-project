package com.tomriu.tom_social_media.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FollowUserResponse {
	private Integer doFollowId;
	private Integer receiveFollowId;
}

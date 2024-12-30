package com.tomriu.tom_social_media.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UnFollowUserResponse {
	private Integer doUnFollowId;
	private Integer receiveUnFollowId;
}

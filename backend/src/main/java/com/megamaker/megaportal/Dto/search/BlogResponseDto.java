package com.megamaker.megaportal.Dto.search;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BlogResponseDto {
    String title;
    String link;
    String description;
    String bloggername;
    String postdate;
}

package com.megamaker.megaportal.Dto.search;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class NewsResponseDto {
    String title;
    String originallink;
    String description;
    String pubDate;
}

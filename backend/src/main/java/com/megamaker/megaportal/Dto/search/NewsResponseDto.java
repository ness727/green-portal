package com.megamaker.megaportal.Dto.search;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NewsResponseDto {
    String title;
    String originallink;
    String description;
    String pubDate;
}

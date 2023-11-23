package com.megamaker.megaportal.Dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class NewsResponseDto {
    String title;
    String originalLink;
    String description;
    String pubDate;
}

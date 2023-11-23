package com.megamaker.megaportal.Dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ImageResponseDto {
    String title;
    String thumbnail;
    String link;
}

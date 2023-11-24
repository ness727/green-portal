package com.megamaker.megaportal.Dto.search;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NaverApiRequestDto {
    String query;
    Integer display;
    Integer start;
    String sort;
}

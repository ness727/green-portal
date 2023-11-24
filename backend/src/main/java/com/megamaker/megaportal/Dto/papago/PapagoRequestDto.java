package com.megamaker.megaportal.Dto.papago;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.bind.annotation.RequestParam;

@Data
@Builder
public class PapagoRequestDto {
    String target;
    String text;
}

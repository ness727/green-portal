package com.megamaker.megaportal.Controller;

import com.megamaker.megaportal.Dto.papago.PapagoRequestDto;
import com.megamaker.megaportal.Service.papago.PapagoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
public class PapagoApiController {
    private final PapagoService papagoService;
    @ResponseBody
    @PostMapping("/api/papago")
    public String translate(@RequestBody PapagoRequestDto translateRequest) {
        log.debug("번역 데이터 보내줌");
        return papagoService.translate(PapagoRequestDto.builder()
                .target(translateRequest.getTarget())
                .text(translateRequest.getText())
                .build()
        );
    }
}

package com.megamaker.megaportal.Service.papago;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.megamaker.megaportal.Dto.papago.PapagoRequestDto;
import com.megamaker.megaportal.Dto.search.BlogResponseDto;
import com.megamaker.megaportal.Dto.search.NaverApiRequestDto;
import com.megamaker.megaportal.PropertyConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PapagoService {
    private final PropertyConfig config;

    public String translate(PapagoRequestDto papagoRequestDto) {

        // ---------------- 언어 감지 ------------------

        String url = "https://openapi.naver.com/";
        URI uri = UriComponentsBuilder.fromHttpUrl(url)  // 보낼 uri 생성
                .path("v1/papago/detectLangs")
                .queryParam("query", papagoRequestDto.getText())
                .encode()
                .build()
                .toUri();

        RestTemplate restTemplate = new RestTemplate();
        RequestEntity<Void> request = RequestEntity.post(uri)  // 네이버 API에 필요한 헤더 정보 추가
                .header("X-Naver-Client-Id", config.getNaverId())
                .header("X-Naver-Client-Secret", config.getNaverSecret())
                .build();

        ResponseEntity<String> result = restTemplate.exchange(request, String.class);  // 결과를 String으로 받음
        String langCode = result.getBody();  // 언어 감지 결과
        ObjectMapper mapper = new ObjectMapper();  // json으로 변환하기 위해 사용
        try {
            langCode = mapper.readTree(langCode).get("langCode").asText();
        }
        catch (JsonProcessingException e) {
            log.error("언어 감지 Json 변환 오류");
        }

        if (langCode.equals("unk")) return "알 수 없는 언어입니다.";
        else if (papagoRequestDto.getTarget().equals(langCode)) return "같은 언어입니다.";
        // --------------------------------------------

        // -------------- 번역하는 부분 -------------
        url = "https://openapi.naver.com/";
        uri = UriComponentsBuilder.fromHttpUrl(url)  // 보낼 uri 생성
                .path("v1/papago/n2mt")
                .queryParam("source", langCode)
                .queryParam("target", papagoRequestDto.getTarget())
                .queryParam("text", papagoRequestDto.getText())
                .encode()
                .build()
                .toUri();

        restTemplate = new RestTemplate();

        request = RequestEntity.post(uri)  // 네이버 API에 필요한 헤더 정보 추가
                .header("X-Naver-Client-Id", config.getNaverId())
                .header("X-Naver-Client-Secret", config.getNaverSecret())
                .build();

        result = restTemplate.exchange(request, String.class);  // 결과를 String으로 받음
        String resultBody = result.getBody();  // body 내용 가져옴

        String translatedResult = "";
        try {
            JsonNode root = mapper.readTree(resultBody);
            JsonNode resultNode = root.get("message").get("result");
            translatedResult = resultNode.get("translatedText").asText();
        } catch (JsonProcessingException e) {
            log.error("번역 Json 변환 오류");
        }

        return translatedResult;
    }
}

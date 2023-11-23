package com.megamaker.megaportal.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.megamaker.megaportal.Dto.ImageResponseDto;
import com.megamaker.megaportal.Dto.NaverApiRequestDto;
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
public class ImageService {
    private final PropertyConfig config;

    public List<ImageResponseDto> searchImages(NaverApiRequestDto naverApiRequestDto) {
        String url = "https://openapi.naver.com/";
        URI uri = UriComponentsBuilder.fromHttpUrl(url)  // 보낼 uri 생성
                .path("v1/search/image")
                .queryParam("query", naverApiRequestDto.getQuery())
                .queryParam("display", naverApiRequestDto.getDisplay())
                .queryParam("start", naverApiRequestDto.getStart())
                .queryParam("sort", naverApiRequestDto.getSort())
                .encode()
                .build()
                .toUri();

        RestTemplate restTemplate = new RestTemplate();

        RequestEntity<Void> request = RequestEntity.get(uri)  // 네이버 API에 필요한 헤더 정보 추가
                .header("X-Naver-Client-Id", config.getNaverId())
                .header("X-Naver-Client-Secret", config.getNaverSecret())
                .build();

        ResponseEntity<String> result = restTemplate.exchange(request, String.class);  // 결과를 String으로 받음
        String resultBody = result.getBody();  // body 내용 가져옴

        ObjectMapper mapper = new ObjectMapper();  // json으로 변환하기 위해 사용
        List<ImageResponseDto> imageDtoList = new ArrayList<>();  // 처리된 결과를 저장하여 보내질 리스트 생성
        try {
            JsonNode root = mapper.readTree(resultBody);
            JsonNode itemsNodes = root.get("items");

            for (JsonNode node : itemsNodes) {
                imageDtoList.add(  // 보낼 이미지 리스트에 새로 추가
                        ImageResponseDto.builder()
                                .title(node.get("title").asText())
                                .thumbnail(node.get("thumbnail").asText())
                                .link(node.get("link").asText())
                                .build()
                );
            }
        } catch (JsonProcessingException e) {
            log.error("Json 변환 오류");
        }

        return imageDtoList;
    }
}

package com.megamaker.megaportal.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.megamaker.megaportal.Dto.NewsResponseDto;
import com.megamaker.megaportal.Dto.NewsAndBlogRequestDto;
import com.megamaker.megaportal.PropertyConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
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
import java.util.Locale;

@Slf4j
@Service
@RequiredArgsConstructor
public class NewsService {
    private final PropertyConfig config;

    public List<NewsResponseDto> searchNews(NewsAndBlogRequestDto newsAndBlogRequestDto) {
        String url = "https://openapi.naver.com/";
        URI uri = UriComponentsBuilder.fromHttpUrl(url)  // 보낼 uri 생성
                .path("v1/search/news.json")
                .queryParam("query", newsAndBlogRequestDto.getQuery())
                .queryParam("display", newsAndBlogRequestDto.getDisplay())
                .queryParam("start", newsAndBlogRequestDto.getStart())
                .queryParam("sort", newsAndBlogRequestDto.getSort())
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
        List<NewsResponseDto> newsDtoList = new ArrayList<NewsResponseDto>();  // 처리된 결과를 저장하여 보내질 리스트 생성
        try {
            JsonNode root = mapper.readTree(resultBody);
            JsonNode itemsNodes = root.get("items");

            for (JsonNode node : itemsNodes) {
                String dateResult = "";
                try {
                    // 날짜를 Date로 변환
                    String strDate = node.get("pubDate").asText();
                    SimpleDateFormat sdf = new SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss Z", Locale.ENGLISH);
                    Date date = sdf.parse(strDate);

                    // 변환한 Date로 다시 형식에 맞춰 String으로 변환
                    SimpleDateFormat outputFormat = new SimpleDateFormat("yyyy년 MM월 dd일 HH시 mm분");
                    dateResult = outputFormat.format(date);
                } catch (Exception e) {
                    log.error("날짜 변환 실패");
                    e.printStackTrace();
                }

                newsDtoList.add(  // 보낼 뉴스 리스트에 새로 추가
                        NewsResponseDto.builder()
                                .title(node.get("title").asText())
                                .originalLink(node.get("originallink").asText())
                                .description(node.get("description").asText())
                                .pubDate(dateResult)
                                .build()
                );
            }
        } catch (JsonProcessingException e) {
            log.error("Json 변환 오류");
        }

        return newsDtoList;
    }
}

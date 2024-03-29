package com.megamaker.megaportal.Controller;

import com.megamaker.megaportal.Dto.search.BlogResponseDto;
import com.megamaker.megaportal.Dto.search.ImageResponseDto;
import com.megamaker.megaportal.Dto.search.NewsResponseDto;
import com.megamaker.megaportal.Dto.search.NaverApiRequestDto;
import com.megamaker.megaportal.Service.search.BlogService;
import com.megamaker.megaportal.Service.search.ImageService;
import com.megamaker.megaportal.Service.search.NewsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/search")
public class SearchApiController {
    private final NewsService newsService;
    private final BlogService blogService;
    private final ImageService imageService;

    @GetMapping("/blog")
    public List<BlogResponseDto> searchBlogs(@RequestParam String query, @RequestParam Integer start) {
        log.debug("블로그 데이터 보내줌" + " & " + query + ", " + start);
        return blogService.searchBlogs(NaverApiRequestDto.builder()
                .query(query)
                .display(10)
                .start(start * 10)
                .sort("date")
                .build()
        );
    }

    @GetMapping("/image")
    public List<ImageResponseDto> searchImages(@RequestParam String query, @RequestParam Integer start) {
        log.debug("이미지 데이터 보내줌" + " & " + query + ", " + start);
        return imageService.searchImages(NaverApiRequestDto.builder()
                .query(query)
                .display(12)
                .start(start * 12)
                .sort("sim")
                .build()
        );
    }

    @GetMapping("/news")
    public List<NewsResponseDto> searchNews(@RequestParam String query, @RequestParam Integer start) {
        log.debug("뉴스 데이터 보내줌" + " & " + query + ", " + start);
        return newsService.searchNews(NaverApiRequestDto.builder()
                .query(query)
                .display(10)
                .start(start * 10)
                .sort("date")
                .build()
        );
    }
}

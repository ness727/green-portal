package com.megamaker.megaportal.Controller;

import com.megamaker.megaportal.Dto.BlogResponseDto;
import com.megamaker.megaportal.Dto.NewsResponseDto;
import com.megamaker.megaportal.Dto.NaverApiRequestDto;
import com.megamaker.megaportal.Service.BlogService;
import com.megamaker.megaportal.Service.NewsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/search")
public class SearchController {
    private final NewsService newsService;
    private final BlogService blogService;
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

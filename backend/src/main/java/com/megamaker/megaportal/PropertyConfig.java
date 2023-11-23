package com.megamaker.megaportal;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.core.env.Environment;

@Configuration
@PropertySource("classpath:properties/env.properties")
@RequiredArgsConstructor
public class PropertyConfig {
    private final Environment environment;

    public String getNaverId() {
        return environment.getProperty("naver.api.id");
    }

    public String getNaverSecret() {
        return environment.getProperty("naver.api.secret");
    }
}

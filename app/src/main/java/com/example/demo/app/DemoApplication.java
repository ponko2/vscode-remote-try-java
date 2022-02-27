package com.example.demo.app;

import com.example.demo.utilities.StringUtils;
import org.apache.commons.text.WordUtils;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

/** DemoApplication. */
@SpringBootApplication
public class DemoApplication {

  public static void main(String[] args) {
    SpringApplication.run(DemoApplication.class, args);
  }

  @Bean
  ApplicationRunner applicationRunner() {
    return args -> {
      var tokens = StringUtils.split(MessageUtils.getMessage());
      var result = StringUtils.join(tokens);
      System.out.println(WordUtils.capitalize(result));
    };
  }
}

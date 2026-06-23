package com.fitness.aiservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GroqService {

    private final WebClient.Builder webClientBuilder;

    @Value("${groq.api.url}")
    private String groqUrl;

    @Value("${groq.api.key}")
    private String groqKey;

    public String getAnswer(String question) {

        WebClient webClient = webClientBuilder.build();

        Map<String, Object> requestBody = Map.of(
                "model", "llama-3.3-70b-versatile",
                "messages", List.of(
                        Map.of(
                                "role", "user",
                                "content", question
                        )
                ),
                "temperature", 0.7
        );

        try {

            Map<String, Object> response = webClient.post()
                    .uri(groqUrl)
                    .header("Authorization", "Bearer " + groqKey)
                    .header("Content-Type", "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            List<Map<String, Object>> choices =
                    (List<Map<String, Object>>) response.get("choices");

            Map<String, Object> choice = choices.get(0);

            Map<String, Object> message =
                    (Map<String, Object>) choice.get("message");

            return message.get("content").toString();

        } catch (Exception e) {
            throw new RuntimeException("Groq API Error", e);
        }
    }
}
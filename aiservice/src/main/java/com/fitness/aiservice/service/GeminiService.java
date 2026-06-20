package com.fitness.aiservice.service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import org.springframework.web.reactive.function.client.WebClientResponseException;
import java.util.Map;

@Service
public class GeminiService {
    private final WebClient webClient;
    @Value("${gemini.api.url}")
    private String geminiURL;
    @Value("${gemini.api.key}")
    private String geminiKey;

    public GeminiService(WebClient.Builder webClientBuiler) {
        this.webClient = webClientBuiler.build();
    }


    public String getAnswer(String question) {

        Map<String, Object> requestBody = Map.of(
                "contents", new Object[]{
                        Map.of(
                                "parts", new Object[]{
                                        Map.of("text", question)
                                }
                        )
                }
        );

        try {

            String response = webClient.post()
                    .uri(geminiURL)
                    .header("Content-Type", "application/json")
                    .header("X-goog-api-key", geminiKey)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            System.out.println("SUCCESS RESPONSE:");
            System.out.println(response);

            return response;

        } catch (WebClientResponseException e) {

            System.out.println("STATUS: " + e.getStatusCode());
            System.out.println("BODY: " + e.getResponseBodyAsString());

            throw e;
        }
    }
}


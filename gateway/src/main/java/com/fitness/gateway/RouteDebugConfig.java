package com.fitness.gateway;
import org.springframework.boot.CommandLineRunner;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RouteDebugConfig {

    @Bean
    CommandLineRunner printRoutes(RouteLocator routeLocator) {
        return args -> routeLocator.getRoutes()
                .subscribe(route -> System.out.println("ROUTE -> " + route));
    }
}
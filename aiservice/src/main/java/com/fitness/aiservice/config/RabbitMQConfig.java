package com.fitness.aiservice.config;


import org.springframework.amqp.core.*;
import org.springframework.amqp.support.converter.JacksonJsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    @Value("${rabbitmq.queue.name}")
    private String queueName;

    @Value("${rabbitmq.exchange.name}")
    private String exchangeName;

    @Value("${rabbitmq.routing.key}")
    private String routingKey;

    @Bean
    public Queue activityQueue() {
        return new Queue(queueName, true);
    }
    @Bean
    public DirectExchange actibrityExchange() {
        return new DirectExchange(exchangeName);
    }


    @Bean
    public Binding activityBinding(
            Queue activityQueue,
            DirectExchange activityExchange) {

        return BindingBuilder
                .bind(activityQueue)
                .to(activityExchange)
                .with(routingKey);
    }

    @Bean
    public MessageConverter jsonMessageConverter() {
        return new JacksonJsonMessageConverter();
    }
}

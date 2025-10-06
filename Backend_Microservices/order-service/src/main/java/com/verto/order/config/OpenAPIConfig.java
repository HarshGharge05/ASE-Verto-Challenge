package com.verto.order.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfig {

    @Bean
    public OpenAPI orderServiceApi(){
        return new OpenAPI()
                .info(new Info().title("Order service API")
                        .description("This is the REST API for Order Service")
                        .version("v0.0.1")
                        .license(new License().name("Apache 2.0")));
    }

}

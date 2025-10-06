package com.verto.order.dto;

import java.math.BigDecimal;

public record OrderRequest(Long id, String email, String skuCode, String imageUrl, String name, String description, BigDecimal price, Integer quantity, UserDetails userDetails) {
    public record UserDetails(String email, String firstName, String lastName){}
}

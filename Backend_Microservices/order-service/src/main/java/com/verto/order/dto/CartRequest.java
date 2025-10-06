package com.verto.order.dto;

import java.math.BigDecimal;

public record CartRequest(String email, String productId, String skuCode, String name, String imageId, String description, BigDecimal price) {
}

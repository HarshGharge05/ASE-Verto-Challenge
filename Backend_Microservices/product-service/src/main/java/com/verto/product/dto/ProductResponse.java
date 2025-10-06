package com.verto.product.dto;

import java.math.BigDecimal;

public record ProductResponse(String id, String skuCode, String name, String image,String description, BigDecimal price) {
}

package com.verto.product.dto;

import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

public record ProductRequest(String id, String skuCode, String name, MultipartFile image, String description, BigDecimal price) {
}

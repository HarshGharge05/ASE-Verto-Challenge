package com.verto.inventory.dto;

public record InventoryResponse(Long id, String skuCode, Integer quantity) {
}

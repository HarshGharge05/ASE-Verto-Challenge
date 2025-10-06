package com.verto.inventory.dto;

public record InventoryRequest(Long id, String skuCode, Integer quantity) {
}

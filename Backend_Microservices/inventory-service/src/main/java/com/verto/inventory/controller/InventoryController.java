package com.verto.inventory.controller;

import com.verto.inventory.dto.InventoryRequest;
import com.verto.inventory.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @PostMapping("/addNewProductInStock")
    public String addNewProductInStock(@ModelAttribute InventoryRequest inventoryRequest){

        inventoryService.addNewProductInStock(inventoryRequest);

        return "New Product is added in the stock";
    }

    @GetMapping("/productIsInStock")
    @ResponseStatus(HttpStatus.OK)
    public boolean isInStock(String skuCode, Integer quantity){
        return inventoryService.isInStock(skuCode, quantity);
    }

}

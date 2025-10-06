package com.verto.inventory.service;

import com.verto.inventory.dto.InventoryRequest;
import com.verto.inventory.model.Inventory;
import com.verto.inventory.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public void addNewProductInStock(InventoryRequest inventoryRequest) {

        Inventory inventory = new Inventory();
        inventory.setSkuCode(inventoryRequest.skuCode());
        inventory.setQuantity(inventoryRequest.quantity());

        inventoryRepository.save(inventory);

    }

    public boolean isInStock(String skuCode, Integer quantity) {

        boolean isPresent = inventoryRepository.existsBySkuCodeAndQuantityIsGreaterThanEqual(skuCode, quantity);

        if(isPresent){
            Inventory product = inventoryRepository.findBySkuCode(skuCode);
            System.out.println("Before : "+product);
            product.setQuantity(product.getQuantity() - quantity);
            inventoryRepository.save(product);
            System.out.println("After : "+product);
        }

        return  isPresent;

    }
}

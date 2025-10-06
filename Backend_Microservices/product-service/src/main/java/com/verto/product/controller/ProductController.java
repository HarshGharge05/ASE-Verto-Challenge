package com.verto.product.controller;

import com.verto.product.dto.ProductRequest;
import com.verto.product.dto.ProductResponse;
import com.verto.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping(value = "/create", consumes = {"multipart/form-data"})
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> createProduct(@ModelAttribute ProductRequest productRequest){
        try {

            ProductResponse response = productService.createProduct(productRequest);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating product: "+e.getMessage());
        }
    }

    @GetMapping("/getProducts")
    public ResponseEntity<Map<String, Object>> getAllProducts(){

        Map<String, Object> response = new HashMap<>();
        try {
            List<ProductResponse> products = productService.getAllProducts();
            response.put("products", products);
        } catch (Exception e) {
            response.put("error", e.getMessage());
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}

package com.verto.order.controller;

import com.verto.order.dto.CartRequest;
import com.verto.order.model.Cart;
import com.verto.order.service.CartService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping("/addProductToCart")
    public ResponseEntity<Map<String, Object>> addProductToCart(@ModelAttribute CartRequest request) {
        System.out.println(request);

        Map<String, Object> response = new HashMap<>();

        try{

            String respMsg = cartService.addProductToCart(request);

            response.put("message", respMsg);

            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception e) {
            response.put("err", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @GetMapping("/getCartItems")
    public List<Cart> getAllCartItems(@RequestParam("email") String email) {
        return cartService.getAllCartItems(email);
    }

    @PutMapping("/updateProductQuantity")
    public String updateProductQuantity(@RequestParam("id") Long id, @RequestParam("quantity") int quantity) {

        try {
            cartService.updateProductQuantity(id, quantity);
        } catch (Exception e) {
            return e.getMessage();
        }

        return "You've changed quantity to "+ quantity + " for this product";

    }

}

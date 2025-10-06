package com.verto.order.service;

import com.verto.order.dto.CartRequest;
import com.verto.order.model.Cart;
import com.verto.order.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;

    public String addProductToCart(CartRequest request) {

        String productId = request.productId();

        Optional<Cart> existingCartItem = cartRepository.findByEmailAndProductId(request.email(), productId);

        if (existingCartItem.isPresent()){
            return "Product is already in the cart";
        }

        Cart newCartItem = new Cart();
        newCartItem.setEmail(request.email());
        newCartItem.setProductId(request.productId());
        newCartItem.setSkuCode(request.skuCode());
        newCartItem.setName(request.name());
        newCartItem.setImageId(request.imageId());
        newCartItem.setDescription(request.description());
        newCartItem.setPrice(request.price());
        newCartItem.setQuantity(1);

        cartRepository.save(newCartItem);

        return "Product added to the cart";

    }

    public List<Cart> getAllCartItems(String email) {

        return cartRepository.findByEmail(email);
    }

    public void updateProductQuantity(Long id, int quantity) {

        Optional<Cart> cart = cartRepository.findById(id);
        try {
            Cart cartItem = cart.get();
            cartItem.setQuantity(quantity);

            cartRepository.save(cartItem);
        } catch (Exception e){
            e.printStackTrace();
        }

    }
}

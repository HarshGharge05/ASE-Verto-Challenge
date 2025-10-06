package com.verto.order.controller;

import com.verto.order.dto.OrderRequest;
import com.verto.order.model.Order;
import com.verto.order.service.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/placeOrder")
    public String placeOrder(@RequestBody OrderRequest request, HttpServletRequest httpServletRequest){
        System.out.println(request);
        try{

            String authHeader = httpServletRequest.getHeader("Authorization");
            String jwtToken = null;
            if (authHeader != null && authHeader.startsWith("Bearer ")){
                jwtToken = authHeader;
                System.out.println(jwtToken);
            }

            orderService.placeOrder(request, jwtToken);
            return "Order placed successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @GetMapping("/getAllOrders")
    public List<Order> getAllOrders(@RequestParam("email") String email) {
        return orderService.getAllOrders(email);
    }

}

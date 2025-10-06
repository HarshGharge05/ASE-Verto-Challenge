package com.verto.order.service;

import com.verto.order.client.InventoryClient;
import com.verto.order.dto.OrderRequest;
import com.verto.order.event.OrderPlacedEvent;
import com.verto.order.model.Order;
import com.verto.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;

    private final InventoryClient inventoryClient;

    private final KafkaTemplate<String, OrderPlacedEvent> kafkaTemplate;

    public void placeOrder(OrderRequest request, String jwtToken) {

        var isProductInStock = inventoryClient.isInStock(request.skuCode(), request.quantity(), jwtToken);

        if (isProductInStock) {
            Order order = new Order();
            order.setEmail(request.email());
            order.setSkuCode(request.skuCode());
            order.setImageUrl(request.imageUrl());
            order.setName(request.name());
            order.setDescription(request.description());
            order.setOrderNumber(UUID.randomUUID().toString());
            order.setPrice(request.price());
            order.setQuantity(request.quantity());

            orderRepository.save(order);

            // Send message to kafka topic
            OrderPlacedEvent orderPlacedEvent = new OrderPlacedEvent();
            orderPlacedEvent.setOrderNumber(order.getOrderNumber());
            orderPlacedEvent.setEmail(request.userDetails().email());
            orderPlacedEvent.setFirstName(request.userDetails().firstName());
            orderPlacedEvent.setLastName(request.userDetails().lastName());

            log.info("Start - Sending OrderPlacedEvent {} to kafka topic order-placed", orderPlacedEvent);
            kafkaTemplate.send("order-placed", orderPlacedEvent);
            log.info("Start - Sending OrderPlacedEvent {} to kafka topic order-placed", orderPlacedEvent);

        } else {
            throw new RuntimeException("Product with Skucode "+request.skuCode()+" is not in stock");
        }

    }

    public List<Order> getAllOrders(String email) {
        return orderRepository.findAllByEmail(email);
    }
}

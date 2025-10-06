package com.verto.order.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    @Column(name = "product_id")
    private String productId;
    @Column(name = "sku_code")
    private String skuCode;
    private String name;
    @Column(name = "image_id")
    private String imageId;
    private String description;
    private BigDecimal price;
    private int quantity;

}

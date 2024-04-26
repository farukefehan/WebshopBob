package com.example.todoappdeel3.dto;

import com.example.todoappdeel3.models.Product;

import java.util.List;

public class OrderDTO {

    public String email;
    public Double totalPrice;
    public List<Product> products;

    public OrderDTO(String email, Double totalPrice, List<Product> products) {
        this.email = email;
        this.totalPrice = totalPrice;
        this.products = products;
    }
}

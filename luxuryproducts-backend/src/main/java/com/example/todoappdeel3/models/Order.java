package com.example.todoappdeel3.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Entity(name = "orders")
public class Order {
    @Id
    @GeneratedValue
    private Long id;
    private String email;
    private double totalPrice;
    @ManyToMany
    @JsonManagedReference
    private List<Product> products;

    public Order() {
    }

    public Order(String email, Double totalPrice, List<Product> products) {
        this.email = email;
        this.totalPrice = totalPrice;
        this.products = products;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setItems(List<Product> products) {
        this.products = products;
    }
}
package com.example.todoappdeel3.dto;

import com.fasterxml.jackson.annotation.JsonAlias;

public class ProductDTO {
    public String name;
    public String brand;
    public String description;
    public Number price;

    public String img;

    @JsonAlias("category_id")
    public long categoryId;

    public ProductDTO(String name, String brand, String description, Number price, String img, long categoryId) {
        this.name = name;
        this.brand = brand;
        this.description = description;
        this.price = price;
        this.categoryId = categoryId;
        this.img = img;
    }
}

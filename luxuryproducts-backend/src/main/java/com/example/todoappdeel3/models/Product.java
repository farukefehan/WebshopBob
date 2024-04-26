package com.example.todoappdeel3.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue
    private long id;
    private String name;
    private String brand;
    private Number price;
    private String description;

    private String img;

    private boolean isFinished = false;

//    @OneToMany(mappedBy = "product")
//    private List<OrderProduct> orderProducts;

//    @ManyToMany(mappedBy = "products")
//    @JsonManagedReference
//    private List<Order> orders;

     /*
    Maps the many-to-one relationship between product and category, jsonbackreference so that we do not get an
    infinite dependency loop in the request. Cascasdetype merge so the product is able to create a category if we
    seed the data to the database. Without the merge you get a persistence race condition.
    */
    @ManyToOne(cascade = CascadeType.MERGE)
    @JsonBackReference
    private Category category;

    //needed by JPA to create the entity must be present no arg constructor
    public Product() {
    }

    public Product(String name, String brand, String description, Number price, Category category, String img) {
        this.name = name;
        this.brand = brand;
        this.description = description;
        this.price = price;
        this.category = category;
        this.img = img;
    }

    //getters and setters are needed to map all the properties to the database by JPA, could
    //also be solved by making the properties public but gives less control over the properties.
    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBrand() { return brand; }

    public void setBrand(String brand) { this.brand = brand; }

    public Number getPrice() { return price; }

    public void setPrice(Number price) { this.price = price; }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public boolean isFinished() {
        return isFinished;
    }

    public void setFinished(boolean finished) {
        isFinished = finished;
    }
}

package com.example.todoappdeel3.utils;

import com.example.todoappdeel3.dao.OrderDAO;
import com.example.todoappdeel3.dao.ProductDAO;
import com.example.todoappdeel3.dao.UserRepository;
import com.example.todoappdeel3.models.Category;
import com.example.todoappdeel3.models.CustomUser;
import com.example.todoappdeel3.models.Order;
import com.example.todoappdeel3.models.Product;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class Seeder {
    private ProductDAO productDAO;

    private OrderDAO orderDAO;
    private UserRepository userRepository;

    public Seeder(ProductDAO productDAO, OrderDAO orderDAO, UserRepository userRepository) {
        this.productDAO = productDAO;
        this.orderDAO = orderDAO;
        this.userRepository = userRepository;
    }

    @EventListener
    public void seed(ContextRefreshedEvent event){
        List<CustomUser> users = this.userRepository.findAll();
//        if (!users.isEmpty()) { return; }

        this.seedProducts();
        this.seedUser();
    }

    private void seedProducts(){
        // Luxe skigear categorieën
        Category luxuryHelmets = new Category("Luxury Helmets");
        Category luxurySkis = new Category("Luxury Skis");
        Category luxurySkiBoots = new Category("Luxury Ski Boots");
        Category luxurySkiPants = new Category("Luxury Ski Pants");
        Category luxurySkiJackets = new Category("Luxury Ski Jackets");


// Luxe producten definiëren
        Product luxuryHelmet = new Product("Carbon Fiber Ski Helmet", "Giro", "Ultra-lightweight helmet with advanced carbon fiber construction for unparalleled safety and comfort.", 450.00, luxuryHelmets, "URL_TO_IMAGE");
        Product luxurySki = new Product("Gold-Plated Alpine Skis", "Fischer", "Exclusive gold-plated skis, designed for optimal performance and outstanding looks on the slopes.", 2000.00, luxurySkis, "URL_TO_IMAGE");
        Product luxurySkiBoot = new Product("Handmade Leather Ski Boots", "Lange", "Elegant leather ski boots with custom fit technology, combining style with peak performance.", 1200.00, luxurySkiBoots, "URL_TO_IMAGE");
        Product luxurySkiPant = new Product("Designer Thermal Ski Pants", "Bogner", "High-fashion insulated ski pants offering maximum warmth and mobility, with stylish detailing.", 650.00, luxurySkiPants, "URL_TO_IMAGE");
        Product luxurySkiJacket = new Product("Diamond-Encrusted Ski Jacket", "Moncler", "Sophisticated ski jacket adorned with genuine diamonds, providing ultimate warmth and luxury.", 5000.00, luxurySkiJackets, "URL_TO_IMAGE");

        List<Product> products = new ArrayList<>(){};
        products.add(luxuryHelmet);
        products.add(luxurySki);
        products.add(luxurySkiBoot);
        products.add(luxurySkiPant);
        products.add(luxurySkiJacket);

        Order firstOrder = new Order("bob@webshopbobenterprise.com", 10.69, products);
        this.orderDAO.createOrder(firstOrder);

//        List<Product> productList = new ArrayList<>();
    }

    private void seedUser(){
        CustomUser customUser = new CustomUser();
        customUser.setEmail("bob@bobsluxuryenterprise.com");
        customUser.setPassword(new BCryptPasswordEncoder().encode("IL0vePupp1es!"));
        userRepository.save(customUser);
    }
}

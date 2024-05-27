package com.example.todoappdeel3.dao;

import com.example.todoappdeel3.dto.OrderDTO;
import com.example.todoappdeel3.models.Order;
import com.example.todoappdeel3.models.Product;
import com.example.todoappdeel3.models.PromoCode;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;

@Component
public class OrderDAO {
    private final OrderRepository orderRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private PromoCodeRepository promoCodeRepository;

    public OrderDAO(OrderRepository orderRepository) { this.orderRepository = orderRepository; }

    public List<Order> getAllOrders() {
        return this.orderRepository.findAll();
    }


    @Transactional
    public void createOrderWithCode(OrderDTO orderDTO,@RequestParam String code) {
        PromoCode promoCode = promoCodeRepository.findByCode(code);
        System.out.println(promoCode.isValid());
        if (promoCode.isValid()) {
            promoCode.setCurrentUsage(promoCode.getCurrentUsage()+1);
            promoCodeRepository.save(promoCode);
        }
        this.orderRepository.save(new Order(orderDTO.email, orderDTO.totalPrice, orderDTO.products));
    }

    @Transactional
    public void createOrderWithOutCoupon(OrderDTO orderDTO) {

        this.orderRepository.save(new Order(orderDTO.email, orderDTO.totalPrice, orderDTO.products));
    }
    @Transactional
    public void createOrder(Order order) {
        this.orderRepository.save(order);
    }


}

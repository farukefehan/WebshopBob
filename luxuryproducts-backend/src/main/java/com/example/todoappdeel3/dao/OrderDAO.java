package com.example.todoappdeel3.dao;

import com.example.todoappdeel3.dto.OrderDTO;
import com.example.todoappdeel3.models.Order;
import com.example.todoappdeel3.models.Product;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class OrderDAO {
    private final OrderRepository orderRepository;

    public OrderDAO(OrderRepository orderRepository) { this.orderRepository = orderRepository; }

    public List<Order> getAllOrders() {
        return this.orderRepository.findAll();
    }


    @Transactional
    public void createOrder(OrderDTO orderDTO) {
        this.orderRepository.save(new Order(orderDTO.email, orderDTO.totalPrice, orderDTO.products));
    }

    @Transactional
    public void createOrder(Order order) {
        this.orderRepository.save(order);
    }
}

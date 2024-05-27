package com.example.todoappdeel3.controller;


import com.example.todoappdeel3.dao.OrderDAO;
import com.example.todoappdeel3.dto.OrderDTO;
import com.example.todoappdeel3.models.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "http://s1142864.student.inf-hsleiden.nl:12864/", "*"})
@RequestMapping("/orders")
public class OrderController {
    private final OrderDAO orderDAO;

    public OrderController(OrderDAO orderDAO) {this.orderDAO = orderDAO;}

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders(){
        return ResponseEntity.ok(this.orderDAO.getAllOrders());
    }

    @PostMapping("/withoutcode")
    public ResponseEntity<String> createOrderwithoutcode(@RequestBody OrderDTO orderDTO){
        this.orderDAO.createOrderWithOutCoupon(orderDTO);
        return ResponseEntity.ok("Created new order");
    }
    @PostMapping("/withcode")
    public ResponseEntity<String> createOrder(@RequestParam String code,@RequestBody OrderDTO orderDTO){
        this.orderDAO.createOrderWithCode(orderDTO, code);
        return ResponseEntity.ok("Created new order");
    }
}

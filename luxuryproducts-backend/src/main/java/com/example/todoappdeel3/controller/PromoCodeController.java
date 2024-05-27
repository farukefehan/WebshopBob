package com.example.todoappdeel3.controller;

import com.example.todoappdeel3.dao.PromoCodeDAO;
import com.example.todoappdeel3.models.Product;
import com.example.todoappdeel3.models.PromoCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "http://s1142864.student.inf-hsleiden.nl:12864/", "*"})
@RequestMapping("/promocode")
public class PromoCodeController {
    private final PromoCodeDAO promoCodeDAO;

    public PromoCodeController(PromoCodeDAO promoCodeDAO) {
        this.promoCodeDAO = promoCodeDAO;
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, String>> addPromoCode(@RequestBody PromoCode promoCode, @RequestParam long idProduct){
        this.promoCodeDAO.createPromoCode(promoCode, idProduct);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Created a PromoCode");
        return ResponseEntity.ok(response);
    }
    @GetMapping("/getAll")
    public ResponseEntity<List<PromoCode>> getAllPromoCodes(){
        return ResponseEntity.ok(this.promoCodeDAO.retrievePromoCode());
    }
    @PostMapping("/apply")
    public ResponseEntity<?> applyPromoCode(@RequestParam String code,@RequestBody List<Product> products ) {
        PromoCode promoCode = promoCodeDAO.validatePromoCode(code);
        if (promoCode != null) {
            double discount = promoCodeDAO.calculateDiscount(promoCode,products);
            return ResponseEntity.ok(Collections.singletonMap("discount", discount));
        } else {
            return ResponseEntity.badRequest().body("Invalid promo code");
        }
    }
    @PostMapping("/addForAll")
    public PromoCode createPromoCodeForAllProducts(@RequestBody PromoCode promoCode){
        return promoCodeDAO.createPromoCodeForAllProducts(promoCode);
    }

}

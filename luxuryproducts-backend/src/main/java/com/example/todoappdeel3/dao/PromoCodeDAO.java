package com.example.todoappdeel3.dao;

import com.example.todoappdeel3.models.Product;
import com.example.todoappdeel3.models.PromoCode;
import com.example.todoappdeel3.models.enume.DiscountType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class PromoCodeDAO {
    @Autowired
    private PromoCodeRepository promoCodeRepository;
    @Autowired
    private  ProductRepository productRepository;

    public PromoCode createPromoCode(PromoCode promoCode,long idProduct) {
        if (promoCode.getCode().length() < 6) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Promo code must be at least 6 characters long");
        }
        // Check if validFrom is before validUntil
        if (!promoCode.getValidFrom().isBefore(promoCode.getValidUntil())) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"The validFrom date must be before the validUntil date");
        }
        Product product=productRepository.findById(idProduct).get();
        promoCode.setProduct(product);
        promoCode.setCurrentUsage(0);
        return promoCodeRepository.save(promoCode);
    }
    public PromoCode createPromoCodeForAllProducts(PromoCode promoCode){
        if (promoCode.getCode().length() < 6) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Promo code must be at least 6 characters long");
        }
        if (!promoCode.getValidFrom().isBefore(promoCode.getValidUntil())) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "The validFrom date must be before the validUntil date");
        }
        List<Product> products = productRepository.findAll();
        PromoCode lastSavedPromoCode = null;

        for (Product p : products) {
            System.out.println(p.getName());

            // Create a new PromoCode instance and copy the necessary properties
            PromoCode newPromoCode = new PromoCode();
            newPromoCode.setCode(promoCode.getCode());
            newPromoCode.setDiscountType(promoCode.getDiscountType());
            newPromoCode.setValidFrom(promoCode.getValidFrom());
            newPromoCode.setValidUntil(promoCode.getValidUntil());
            newPromoCode.setMaxUsage(promoCode.getMaxUsage());
            newPromoCode.setDiscountValue(promoCode.getDiscountValue());
            newPromoCode.setCurrentUsage(0);
            newPromoCode.setProduct(p);

            lastSavedPromoCode = promoCodeRepository.save(newPromoCode);
        }
        return lastSavedPromoCode; // Return the last saved promo code (or adjust based on your needs)
    }

    public List<PromoCode> retrievePromoCode(){
        List<PromoCode> promoCodes=promoCodeRepository.findAll();
        return promoCodes;
    }
    public PromoCode validatePromoCode(String code) {
        PromoCode promoCode = promoCodeRepository.findByCode(code);
        System.out.println(promoCode.isValid());
        if (promoCode.isValid()) {
            return promoCode;
        }
        return null;
    }

    public double calculateDiscount(PromoCode promoCode, List<Product> products) {
        double totalPrice = calculateTotalPrice(products);

        // Check if the promo code is applicable to any of the products in the cart
        boolean isApplicable = false;
        for (Product product : products) {
            if (promoCode.getProduct().getId()==product.getId()) {
                isApplicable = true;
                break;
            }
        }

        if (!isApplicable) {
            // Promo code is not applicable to any product in the cart
            return 0; // No discount applied
        }

        if (promoCode.getDiscountType() == DiscountType.PERCENTAGE) {
            return totalPrice * promoCode.getDiscountValue() / 100;
        } else {
            return promoCode.getDiscountValue();
        }
    }
    private double calculateTotalPrice(List<Product> products) {
        double totalPrice = 0;
        for (Product product : products) {
            totalPrice += product.getPrice().doubleValue();
        }
        return totalPrice;
    }
}

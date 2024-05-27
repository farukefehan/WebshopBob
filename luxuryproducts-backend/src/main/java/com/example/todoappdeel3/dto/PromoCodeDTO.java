package com.example.todoappdeel3.dto;

import com.example.todoappdeel3.models.enume.DiscountType;
import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.persistence.*;

import java.time.LocalDateTime;

public class PromoCodeDTO {
    public PromoCodeDTO(String code, DiscountType discountType, double discountValue, LocalDateTime validFrom, LocalDateTime validUntil, int maxUsage, int currentUsage,long productId) {
        this.code = code;
        this.discountType = discountType;
        this.discountValue = discountValue;
        this.validFrom = validFrom;
        this.validUntil = validUntil;
        this.maxUsage = maxUsage;
        this.currentUsage = currentUsage;
        this.productId = productId;
    }

    private String code;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DiscountType discountType;
    private double discountValue;
    private LocalDateTime validFrom;
    private LocalDateTime validUntil;
    private int maxUsage;
    private int currentUsage;
    @JsonAlias("product_id")
    public long productId;
}

package com.example.todoappdeel3.dto;

import com.example.todoappdeel3.models.enume.RoleType;

public class LoginResponse {
    public String email;
    public String token;

    public RoleType roleType;

    public LoginResponse(String email, String token,RoleType roleType) {
        this.email = email;
        this.token = token;
        this.roleType=roleType;
    }
}

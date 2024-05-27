package com.example.todoappdeel3.models;

import com.example.todoappdeel3.models.enume.RoleType;
import jakarta.persistence.*;

@Entity(name = "Users")
public class CustomUser {
    @Id
    @GeneratedValue
    private Long id;

    private String email;
    private String password;
    @Enumerated(EnumType.STRING)
    private RoleType role;
    public RoleType getRole() {
        return role;
    }

    public void setRole(RoleType role) {
        this.role = role;
    }



    public CustomUser() {
    }

    public CustomUser(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String username) {
        this.email = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}

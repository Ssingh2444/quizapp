package com.example.Quiz_backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("users")
public class User {
    @Id
    private Long id;

    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String password;   // dev only for now
    private String role;       // "ADMIN" or "PLAYER"

    // three extra attributes for your rubric
    private String phone;
    private String avatarUrl;
    private String bio;

    public User() {}
    // Alt+Insert → Getters/Setters later
}

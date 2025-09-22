package com.example.Quiz_backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Table("password_reset_tokens")
public class PasswordResetToken {
    @Id
    private Long id;

    private Long userId;
    private String token;
    private LocalDateTime expiresAt;
    private boolean used;

    public PasswordResetToken() {}
}

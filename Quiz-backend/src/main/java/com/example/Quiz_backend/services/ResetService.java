package com.example.Quiz_backend.services;

import com.example.Quiz_backend.db.PasswordResetTokenRepo;
import org.springframework.stereotype.Service;

@Service
public class ResetService {
    private final PasswordResetTokenRepo tokenRepo;
    public ResetService(PasswordResetTokenRepo tokenRepo) { this.tokenRepo = tokenRepo; }

    // TODO: issue token, verify token (mock "email" by logging to console)
}

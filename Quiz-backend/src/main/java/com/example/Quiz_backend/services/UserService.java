package com.example.Quiz_backend.services;

import com.example.Quiz_backend.db.UserRepo;
import org.springframework.stereotype.Service;
import com.example.Quiz_backend.dto.RegisterRequest;
import com.example.Quiz_backend.dto.UserResponse;
import com.example.Quiz_backend.model.User;


@Service
public class UserService {
    private final UserRepo userRepo;

    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public UserResponse register(RegisterRequest req) {
        // uniqueness checks
        userRepo.findByUsername(req.getUsername())
                .ifPresent(u -> {
                    throw new IllegalArgumentException("username is already taken");
                });
        userRepo.findByEmail(req.getEmail())
                .ifPresent(u -> {
                    throw new IllegalArgumentException("email is already registered");
                });

        // create entity
        User u = new User();
        u.setUsername(req.getUsername());
        u.setFirstName(req.getFirstName());
        u.setLastName(req.getLastName());
        u.setEmail(req.getEmail());
        u.setPassword(req.getPassword()); // plain for now (beginner stack)
        u.setRole("PLAYER");

        // your 3 extra fields
        u.setPhone(req.getPhone());
        u.setAvatarUrl(req.getAvatarUrl());
        u.setBio(req.getBio());

        // persist
        User saved = userRepo.save(u);
        return toResponse(saved);
    }

}

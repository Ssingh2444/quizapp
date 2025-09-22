package com.example.Quiz_backend.services;

import com.example.Quiz_backend.db.LikeRepo;
import org.springframework.stereotype.Service;

@Service
public class LikeService {
    private final LikeRepo likeRepo;
    public LikeService(LikeRepo likeRepo) { this.likeRepo = likeRepo; }

    // TODO: like/unlike; count likes
}

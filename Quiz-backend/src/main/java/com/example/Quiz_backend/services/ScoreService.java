package com.example.Quiz_backend.services;

import com.example.Quiz_backend.db.AttemptRepo;
import org.springframework.stereotype.Service;

@Service
public class ScoreService {
    private final AttemptRepo attemptRepo;
    public ScoreService(AttemptRepo attemptRepo) { this.attemptRepo = attemptRepo; }

    // TODO: save attempt; compute totals, average; sorted scoreboard
}

package com.example.Quiz_backend.services;

import com.example.Quiz_backend.db.QuizTournamentRepo;
import org.springframework.stereotype.Service;

@Service
public class QuizService {
    private final QuizTournamentRepo quizRepo;
    public QuizService(QuizTournamentRepo quizRepo) { this.quizRepo = quizRepo; }

    // TODO: admin CRUD tournaments; OpenTDB fetch 10 Qs (no hardcoded choices)
}

package com.example.Quiz_backend.controllers;

import com.example.Quiz_backend.services.LikeService;
import com.example.Quiz_backend.services.QuizService;
import com.example.Quiz_backend.services.ScoreService;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class QuizController {
    private final QuizService quizService;
    private final ScoreService scoreService;
    private final LikeService likeService;

    public QuizController(QuizService quizService, ScoreService scoreService, LikeService likeService) {
        this.quizService = quizService;
        this.scoreService = scoreService;
        this.likeService = likeService;
    }

    // TODO: list quizzes (ongoing/upcoming/past/participated), participate, submit, scores, like/unlike
}


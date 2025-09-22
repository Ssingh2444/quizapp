package com.example.Quiz_backend.controllers;

import com.example.Quiz_backend.services.QuizService;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminController {
    private final QuizService quizService;
    public AdminController(QuizService quizService) { this.quizService = quizService; }

    // TODO: /admin/users (create admin); /admin/tournaments (CRUD)
}

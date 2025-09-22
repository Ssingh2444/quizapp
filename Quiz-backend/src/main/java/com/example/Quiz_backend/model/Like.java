package com.example.Quiz_backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("likes")
public class Like {
    @Id
    private Long id;

    private Long userId;
    private Long quizId;

    public Like() {}
}

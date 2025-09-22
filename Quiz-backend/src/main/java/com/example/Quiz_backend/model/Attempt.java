package com.example.Quiz_backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Table("attempts")
public class Attempt {
    @Id
    private Long id;

    private Long userId;
    private Long quizId;
    private Integer score; // 0..10
    private LocalDateTime completedAt;

    public Attempt() {}
}

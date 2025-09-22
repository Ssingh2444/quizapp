package com.example.Quiz_backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDate;

@Table("quiz_tournaments")
public class QuizTournament {
    @Id
    private Long id;

    private String name;
    private String category;
    private String difficulty;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer minPassingScore;

    public QuizTournament() {}
}

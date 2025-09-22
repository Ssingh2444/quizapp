package com.example.Quiz_backend.db;

import com.example.Quiz_backend.model.QuizTournament;
import org.springframework.data.repository.CrudRepository;

public interface QuizTournamentRepo extends CrudRepository<QuizTournament, Long> {}

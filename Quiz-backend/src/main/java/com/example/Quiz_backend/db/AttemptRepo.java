package com.example.Quiz_backend.db;

import com.example.Quiz_backend.model.Attempt;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface AttemptRepo extends CrudRepository<Attempt, Long> {
    List<Attempt> findByQuizId(Long quizId);
    List<Attempt> findByUserId(Long userId);
}

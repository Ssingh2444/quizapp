package com.example.Quiz_backend.db;

import com.example.Quiz_backend.model.Like;
import org.springframework.data.repository.CrudRepository;

public interface LikeRepo extends CrudRepository<Like, Long> {
    long countByQuizId(Long quizId);
    boolean existsByUserIdAndQuizId(Long userId, Long quizId);
    void deleteByUserIdAndQuizId(Long userId, Long quizId);
}

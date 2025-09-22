
package com.example.Quiz_backend.db;

import com.example.Quiz_backend.model.PasswordResetToken;
import org.springframework.data.repository.CrudRepository;
import java.util.Optional;

public interface PasswordResetTokenRepo extends CrudRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
}

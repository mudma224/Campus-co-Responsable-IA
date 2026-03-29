package ma.ensab.campus_eco.repository;

import ma.ensab.campus_eco.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
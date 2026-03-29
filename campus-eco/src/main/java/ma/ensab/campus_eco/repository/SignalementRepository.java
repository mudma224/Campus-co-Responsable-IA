package ma.ensab.campus_eco.repository;

import ma.ensab.campus_eco.model.Signalement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ma.ensab.campus_eco.model.User;
import java.util.List;

@Repository
public interface SignalementRepository extends JpaRepository<Signalement, Long> {
    List<Signalement> findByUser(User user);
}
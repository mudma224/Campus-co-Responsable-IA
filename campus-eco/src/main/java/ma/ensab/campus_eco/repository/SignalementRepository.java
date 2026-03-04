package ma.ensab.campus_eco.repository;

import ma.ensab.campus_eco.model.Signalement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SignalementRepository extends JpaRepository<Signalement, Long> {
}
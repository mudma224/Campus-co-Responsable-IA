package ma.ensab.campus_eco.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "signalement", schema = "ecologie")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Signalement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;
    private String description;
    private String localisation;

    @Enumerated(EnumType.STRING)
    private Statut statut = Statut.EN_COURS;

    private LocalDateTime dateCreation = LocalDateTime.now();

    private String suggestionEco;

    public enum Statut {
        EN_COURS, TRAITE
    }
}
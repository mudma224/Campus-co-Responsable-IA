package ma.ensab.campus_eco.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class SignalementDTO {
    private Long id;
    private String type;
    private String description;
    private String localisation;
    private String statut;           // "EN_COURS" ou "TRAITE" (en String pour React)
    private LocalDateTime dateCreation;
    private String suggestionEco;
    private Long userId;             // On enverra juste l'ID de l'utilisateur (pas tout l'objet)
}
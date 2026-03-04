package ma.ensab.campus_eco.service;

import ma.ensab.campus_eco.model.Signalement;
import ma.ensab.campus_eco.repository.SignalementRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class SignalementService {

    private final SignalementRepository repository;

    public SignalementService(SignalementRepository repository) {
        this.repository = repository;
    }

    public Signalement creerSignalement(Signalement signalement) {
        // Force toujours le statut initial à EN_COURS (règle métier)
        signalement.setStatut(Signalement.Statut.EN_COURS);

        signalement.setSuggestionEco(genererSuggestion(signalement.getType()));
        signalement.setDateCreation(LocalDateTime.now());
        return repository.save(signalement);
    }

    public List<Signalement> getAllSignalements() {
        return repository.findAll();
    }

    public Signalement changerStatut(Long id, Signalement.Statut nouveauStatut) {
        Signalement s = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Signalement non trouvé avec l'id : " + id));
        s.setStatut(nouveauStatut);
        return repository.save(s);
    }

    private String genererSuggestion(String type) {
        if (type == null) return "Vérifiez le problème et signalez-le à l'administration.";

        return switch (type.toLowerCase()) {
            case "gaspillage d'énergie", "énergie" ->
                    "Éteignez les lumières et les appareils inutiles. Pensez à installer des détecteurs de présence.";
            case "fuite d'eau", "eau" ->
                    "Fermez le robinet principal si possible et contactez immédiatement la maintenance.";
            case "salle inutilisée éclairée", "éclairage" ->
                    "Éteignez les lumières en sortant. Proposition : installer des minuteurs ou détecteurs.";
            case "déchet", "poubelle" ->
                    "Triez vos déchets ! Le campus vise le zéro déchet plastique d'ici 2027.";
            default ->
                    "Merci pour votre signalement ! Votre action contribue à rendre le campus plus éco-responsable.";
        };
    }
}
package ma.ensab.campus_eco.service;

import ma.ensab.campus_eco.dto.SignalementDTO;
import ma.ensab.campus_eco.dto.SignalementRequestDTO;
import ma.ensab.campus_eco.mapper.SignalementMapper;
import ma.ensab.campus_eco.model.Signalement;
import ma.ensab.campus_eco.model.User;
import ma.ensab.campus_eco.repository.SignalementRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SignalementService {

    private final SignalementRepository repository;
    private final SignalementMapper mapper;

    public SignalementService(SignalementRepository repository, SignalementMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public SignalementDTO creerSignalement(SignalementRequestDTO request, User user) {
        Signalement entity = mapper.toEntity(request);

        // Force toujours NOUVEAU au moment de la création
        entity.setStatut(Signalement.Statut.NOUVEAU);
        entity.setUser(user);
        entity.setSuggestionEco(genererSuggestion(request.getType()));

        Signalement saved = repository.save(entity);
        return mapper.toDto(saved);
    }

    public List<SignalementDTO> getSignalementsByUser(User user) {
        return repository.findByUser(user).stream()
                .map(mapper::toDto)
                .toList();
    }

    public List<SignalementDTO> getAllSignalements() {
        return repository.findAll().stream()
                .map(mapper::toDto)
                .toList();
    }

    public SignalementDTO changerStatut(Long id, String nouveauStatut) {
        Signalement entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Signalement non trouvé"));

        mapper.updateStatut(entity, nouveauStatut);
        Signalement saved = repository.save(entity);
        return mapper.toDto(saved);
    }

    private String genererSuggestion(String type) {
        if (type == null) return "Vérifiez le problème...";

        return switch (type.toLowerCase()) {
            case "gaspillage d'énergie", "énergie" -> "Éteignez les lumières...";
            case "fuite d'eau", "eau" -> "Fermez le robinet...";
            case "salle inutilisée éclairée", "éclairage" -> "Éteignez les lumières en sortant...";
            case "déchet", "poubelle" -> "Triez vos déchets !";
            default -> "Merci pour votre signalement !";
        };
    }
}
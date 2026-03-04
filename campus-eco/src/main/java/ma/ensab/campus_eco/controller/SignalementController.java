package ma.ensab.campus_eco.controller;

import ma.ensab.campus_eco.model.Signalement;
import ma.ensab.campus_eco.service.SignalementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/signalements")
@CrossOrigin(origins = "http://localhost:5173")
public class SignalementController {

    private final SignalementService service;

    public SignalementController(SignalementService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Signalement> creer(@RequestBody Signalement signalement) {
        return ResponseEntity.ok(service.creerSignalement(signalement));
    }

    @GetMapping
    public List<Signalement> liste() {
        return service.getAllSignalements();
    }

    @PutMapping("/{id}/statut")
    public ResponseEntity<Signalement> updateStatut(@PathVariable Long id,
                                                    @RequestBody Signalement.Statut statut) {
        return ResponseEntity.ok(service.changerStatut(id, statut));
    }
}
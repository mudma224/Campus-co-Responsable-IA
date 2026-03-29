package ma.ensab.campus_eco.controller;

import ma.ensab.campus_eco.dto.SignalementDTO;
import ma.ensab.campus_eco.dto.SignalementRequestDTO;
import ma.ensab.campus_eco.model.User;
import ma.ensab.campus_eco.service.SignalementService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    public ResponseEntity<SignalementDTO> creer(@RequestBody SignalementRequestDTO request,
                                                @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(service.creerSignalement(request, user));
    }

    @GetMapping
    public List<SignalementDTO> liste(@AuthenticationPrincipal User user) {
        if (user.getRole() == User.Role.ADMIN) {
            return service.getAllSignalements();
        } else {
            return service.getSignalementsByUser(user);
        }
    }

    // ← NOUVEL ENDPOINT AJOUTÉ (le bouton fonctionnera maintenant)
    @PutMapping("/{id}/statut")
    public ResponseEntity<SignalementDTO> updateStatut(@PathVariable Long id,
                                                       @RequestBody String statut,
                                                       @AuthenticationPrincipal User currentUser) {
        // Seuls les admins peuvent changer le statut
        if (currentUser.getRole() != User.Role.ADMIN) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(service.changerStatut(id, statut));
    }
}
package ma.ensab.campus_eco.controller;

import ma.ensab.campus_eco.dto.AuthResponseDTO;
import ma.ensab.campus_eco.dto.LoginRequestDTO;
import ma.ensab.campus_eco.model.User;
import ma.ensab.campus_eco.repository.UserRepository;
import ma.ensab.campus_eco.service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public AuthController(UserRepository userRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO login) {
        User user = userRepository.findByEmail(login.getEmail());

        if (user != null && encoder.matches(login.getPassword(), user.getPassword())) {
            String token = jwtService.generateToken(user);
            return ResponseEntity.ok(new AuthResponseDTO(
                    token,
                    user.getRole().name(),
                    user.getNom(),
                    user.getPrenom()
            ));
        }

        return ResponseEntity.badRequest().body("Identifiants incorrects");
    }
}
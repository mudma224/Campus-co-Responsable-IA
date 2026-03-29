package ma.ensab.campus_eco.config;

import ma.ensab.campus_eco.model.User;
import ma.ensab.campus_eco.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public DataInitializer(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        // Création utilisateur Étudiant
        if (userRepository.findByEmail("etudiant@ensa.ma") == null) {
            User etudiant = new User();
            etudiant.setEmail("etudiant@ensa.ma");
            etudiant.setPassword(encoder.encode("123456"));
            etudiant.setNom("Ahmed");
            etudiant.setPrenom("Etudiant");
            etudiant.setRole(User.Role.USER);
            userRepository.save(etudiant);
            System.out.println("✅ Utilisateur ETUDIANT créé avec succès");
        }

        // Création utilisateur Admin
        if (userRepository.findByEmail("admin@ensa.ma") == null) {
            User admin = new User();
            admin.setEmail("admin@ensa.ma");
            admin.setPassword(encoder.encode("123456"));
            admin.setNom("Fatima");
            admin.setPrenom("Admin");
            admin.setRole(User.Role.ADMIN);
            userRepository.save(admin);
            System.out.println("✅ Utilisateur ADMIN créé avec succès");
        }
    }
}
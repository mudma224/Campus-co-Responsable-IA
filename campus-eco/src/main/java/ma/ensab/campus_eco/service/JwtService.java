package ma.ensab.campus_eco.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import ma.ensab.campus_eco.model.User;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

    // Clé secrète (change-la par une vraie longue clé en production)
    private final SecretKey secretKey = Keys.hmacShaKeyFor(
            "votre-cle-secrete-super-longue-et-securisee-2026-ensa-benimellal-1234567890".getBytes()
    );

    public String generateToken(User user) {
        return Jwts.builder()
                .subject(user.getEmail())
                .claim("role", user.getRole().name())
                .claim("nom", user.getNom())
                .claim("prenom", user.getPrenom())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 24h
                .signWith(secretKey)
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }
}
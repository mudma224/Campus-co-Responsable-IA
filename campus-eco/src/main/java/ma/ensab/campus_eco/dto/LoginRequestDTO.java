package ma.ensab.campus_eco.dto;

import lombok.Data;

@Data
public class LoginRequestDTO {
    private String email;
    private String password;
}
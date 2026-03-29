package ma.ensab.campus_eco.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SignalementRequestDTO {

    @NotBlank(message = "Le type est obligatoire")
    private String type;

    @NotBlank(message = "La description est obligatoire")
    private String description;

    @NotBlank(message = "La localisation est obligatoire")
    private String localisation;
}
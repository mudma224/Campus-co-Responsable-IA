package ma.ensab.campus_eco.mapper;

import ma.ensab.campus_eco.dto.SignalementDTO;
import ma.ensab.campus_eco.dto.SignalementRequestDTO;
import ma.ensab.campus_eco.model.Signalement;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface SignalementMapper {

    @Mapping(target = "statut", source = "statut")
    @Mapping(target = "userId", source = "user.id")
    SignalementDTO toDto(Signalement signalement);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "dateCreation", ignore = true)
    @Mapping(target = "suggestionEco", ignore = true)
    @Mapping(target = "statut", ignore = true)        // ← Important : on laisse le service décider
    @Mapping(target = "user", ignore = true)
    Signalement toEntity(SignalementRequestDTO request);

    @Mapping(target = "statut", source = "statut")
    void updateStatut(@MappingTarget Signalement entity, String statut);
}
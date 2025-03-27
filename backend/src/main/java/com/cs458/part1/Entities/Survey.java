package com.cs458.part1.Entities;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "Survey")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Survey {
    @Id
    String Id;
    String Name;
    String Surname;
    LocalDate DateOfBirth;
    String City;
    Gender Gender;
    List<AIModel> AiModel;
    String UseCaseOfAi;
    String EducationLevel;

}

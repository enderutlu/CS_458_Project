package com.cs458.part1.Entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "AiModel")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AIModel {
    @Id
    String Id;
    AIType AiType;
    String Description;
}

package com.cs458.part1.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.cs458.part1.Entities.Survey;

@Repository
public interface SurveyRepository extends MongoRepository<Survey, String> {
    


}

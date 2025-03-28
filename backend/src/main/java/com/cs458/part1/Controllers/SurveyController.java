package com.cs458.part1.Controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cs458.part1.Entities.Survey;
import com.cs458.part1.Repositories.SurveyRepository;
import com.cs458.part1.Services.SurveyService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/survey")
public class SurveyController {

    @Autowired
    SurveyRepository surveyRepository;
    @Autowired
    SurveyService surveyService;
    

    @PostMapping("/createSurvey")
    public String insert(@RequestBody Survey survey) {
        return surveyService.createSurvey(survey).toString();
    }

    @GetMapping("/getAllSurveys")
    public List<Survey> get() {
        return surveyRepository.findAll().stream().collect(Collectors.toList());
    }
}


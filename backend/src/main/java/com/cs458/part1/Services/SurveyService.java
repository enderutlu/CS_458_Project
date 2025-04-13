package com.cs458.part1.Services;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cs458.part1.MailService;
import com.cs458.part1.Entities.AIModel;
import com.cs458.part1.Entities.Survey;
import com.cs458.part1.Entities.User;
import com.cs458.part1.Repositories.SurveyRepository;

@Service
public class SurveyService {

    private final SurveyRepository surveyRepository;
    private final MailService mailService;

    public SurveyService(SurveyRepository surveyRepository, MailService mailService) {
        this.surveyRepository = surveyRepository;
        this.mailService = mailService;
    }

    @Transactional
    public String createSurvey(Survey survey) {
        surveyRepository.save(survey);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = ((User)auth.getPrincipal()).getEmail();
        String mailBody = CreateMailBody(survey);
        mailService.sendEmail(email, "Your Survey Results", mailBody);
        return mailBody;
    }

    private String CreateMailBody(Survey survey){
        String body = "";
        body = body.concat("Name: " + survey.getName() + "\n");
        body = body.concat("Surname: " + survey.getSurname() + "\n");
        body = body.concat("Date of birth: " + survey.getDateOfBirth().toString() + "\n");
        body = body.concat("City: " + survey.getCity() + "\n");
        String gender = FirstLetterUppercase(survey.getGender().toString());
        body = body.concat("Gender: " + gender + "\n");
        body = body.concat("AI Models: " +"\n\n");
        for (AIModel aiModel : survey.getAiModel()) {
            body = body.concat("\t" + (survey.getAiModel().indexOf(aiModel) + 1) + "." + "\n");
            String aiType = FirstLetterUppercase(aiModel.getAiType().toString());
            body = body.concat("\t\t" + "AI Type: " + aiType +"\n");
            body = body.concat("\t\t" + "Description: " + aiModel.getDescription() +"\n");
        }
        body = body.concat("\n");
        body = body.concat("Use Case of AI: " + survey.getUseCaseOfAi() + "\n");
        body = body.concat("Education Level: " + survey.getEducationLevel() + "\n");

        return body;
    }

    private String FirstLetterUppercase(String string){
        String first = string.substring(0, 1);
        string = string.substring(1);
        string = first.toUpperCase().concat(string);
        return string;
    }
}

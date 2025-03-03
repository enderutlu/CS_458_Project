package com.cs458.part1.Controllers;

import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

import org.springframework.web.bind.annotation.RequestMapping;


@RestController
public class MainController {
    
    @RequestMapping("/")
    public String welcome() {
        return "Welcome";
    }
    
    @RequestMapping("/user")
    public Principal user(Principal user) {
        return user;
    }

}

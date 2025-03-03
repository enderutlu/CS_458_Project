package com.cs458.part1.Controllers;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cs458.part1.Entities.User;
import com.cs458.part1.Repositories.UserRepository;

@RestController
@RequestMapping("/user")
public class UserController {
    
    @Autowired
    UserRepository repo;

    @GetMapping("/getAllUsers")
    public List<User> get() {
        return repo.findAll().stream().collect(Collectors.toList());
    }
    
    @PostMapping("/createUser")
    public String insert(@RequestBody User user) {
        // User user = new User();
        // user.setEmail("ender@gmail.com");
        // user.setName("Ender");
        // user.setSurname("Utlu");
        // user.setPhoneNumber("05448242002");
        // user.setDateOfBirth(LocalDate.of(2002, 8, 1));
        return repo.save(user).toString();
    }
    
    @DeleteMapping("/deleteUser/{id}")
    public void delete(@PathVariable String id) {
        repo.deleteById(id);
    }

    @PostMapping("/getUserByEmail")
    public ResponseEntity<?> getUserByEmail(@RequestBody String email) {
        Optional<User> e = repo.findAll().stream().filter(p -> p.getEmail().equals(email)).findFirst();
        
        return ResponseEntity.ok().body(e.isPresent());
    }
    
}

package com.cs458.part1.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import com.cs458.part1.JwtUtil;
import com.cs458.part1.Entities.User;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class LoginController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;

    public LoginController(AuthenticationManager authenticationManager, UserDetailsService userDetailsService, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        String email = user.getEmail();
        String password = user.getPassword();

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);
            String token = jwtUtil.generateToken(userDetails);

            return ResponseEntity.ok(token);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }
    }
}

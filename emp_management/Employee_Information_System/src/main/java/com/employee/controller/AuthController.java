package com.employee.controller;

import com.employee.model.User;
import com.employee.repository.UserRepository;
import com.employee.security.JwtResponse;
import com.employee.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsername(),
                    loginRequest.getPassword()
                )
            );

            User user = userRepository.findByUsername(loginRequest.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            String token = JwtUtil.generateToken(user.getUsername(), user.getRole());

            return ResponseEntity.ok(new JwtResponse(token, user.getRole()));
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }
}

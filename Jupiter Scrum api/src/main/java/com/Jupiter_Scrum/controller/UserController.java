package com.Jupiter_Scrum.controller;

import com.Jupiter_Scrum.model.User;
import com.Jupiter_Scrum.repo.userRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    @Autowired
    private userRepo userRepository;

    // GET all users
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // GET user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // POST create a new user
    @PostMapping("/addUser")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        try {
             String encodedPassword = Base64.getEncoder().encodeToString(user.getPassword().getBytes());
             user.setPassword(encodedPassword);
            User savedUser = userRepository.save(user);
            return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // PUT update an existing user
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        Optional<User> existingUserOpt = userRepository.findById(id);
        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();
            existingUser.setFirstName(userDetails.getFirstName());
            existingUser.setLastName(userDetails.getLastName());
            existingUser.setEmail(userDetails.getEmail());
            existingUser.setDepartment(userDetails.getDepartment());
            existingUser.setPosition(userDetails.getPosition());
            existingUser.setHireDate(userDetails.getHireDate());
            existingUser.setBirthDate(userDetails.getBirthDate());
            existingUser.setAddress(userDetails.getAddress());
            existingUser.setPassword(userDetails.getPassword()); // Update password field

            User updatedUser = userRepository.save(existingUser);
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // GET user by email
    @GetMapping("/login")
    public ResponseEntity<User> getUserByEmail(@RequestParam String email) {
        // Find the user by email
        User user = userRepository.findByEmail(email);
        if (user != null) {
            // User exists, return the user object
            return ResponseEntity.ok(user);
        }
        // User does not exist, return not found status
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    // DELETE a user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}

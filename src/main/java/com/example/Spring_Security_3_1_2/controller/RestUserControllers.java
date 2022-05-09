package com.example.Spring_Security_3_1_2.controller;

import com.example.Spring_Security_3_1_2.model.User;
import com.example.Spring_Security_3_1_2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api")
public class RestUserControllers {
    private UserService userService;

    @Autowired
    public RestUserControllers(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public User userPage( Principal principal) {
        return userService.getUserByUsername(principal.getName());
    }
}

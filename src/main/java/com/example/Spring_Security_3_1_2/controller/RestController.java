package com.example.Spring_Security_3_1_2.controller;

import com.example.Spring_Security_3_1_2.dao.RoleDao;
import com.example.Spring_Security_3_1_2.dao.UserDao;
import com.example.Spring_Security_3_1_2.exception.NoUserSuchException;
import com.example.Spring_Security_3_1_2.model.User;
import com.example.Spring_Security_3_1_2.service.RoleService;
import com.example.Spring_Security_3_1_2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api")
public class RestController {
    private final UserDao userDao;
    private final RoleDao roleDao;


    private UserService userService;
    private RoleService roleService;

    @Autowired
    public RestController(UserDao userDao, RoleDao roleDao, UserService userService, RoleService roleService) {
        this.userDao = userDao;
        this.roleDao = roleDao;
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/users")
    public List<User> showAllUsers() {
        List<User> userList = userService.index();
        return userList;
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable long id) {
        User user = userService.getUserById(id);
        if (user == null) {
            throw new NoUserSuchException("Юзер с " + id + "не найден в базе данных");
        }
        return user;
    }

    @PostMapping("/users")
    public void addUser(@RequestBody User user) {
        userService.addUser(user);

    }

    @PutMapping("/users")
    public User updateUser(@RequestBody User user) {
        userService.updateUser(user);
        return user;
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable long id) {
        User user = userService.getUserById(id);
        if (user == null) {
            throw new NoUserSuchException("Юзер по ID" + " " + id + "" + "не найден  в базе");
        }
        userService.removeUser(id);
        return "Юзер по ID" + id + " " + "удален";
    }


}

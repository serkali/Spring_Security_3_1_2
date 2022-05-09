package com.example.Spring_Security_3_1_2.service;

import com.example.Spring_Security_3_1_2.dao.RoleDao;
import com.example.Spring_Security_3_1_2.dao.UserDao;
import com.example.Spring_Security_3_1_2.model.Role;
import com.example.Spring_Security_3_1_2.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.HashSet;
import java.util.List;

@Service
public class UserService {


    private final RoleDao roleDao;
    private final UserDao userDao;
    private final PasswordEncoder passwordEncoder;


    @Autowired
    public UserService(RoleDao roleDao, UserDao userDao, PasswordEncoder passwordEncoder) {
        this.roleDao = roleDao;
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> index() {
        return userDao.findAll();
    }

    public User getUserById(long id) {
        return userDao.getById(id);
    }

    public void addUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userDao.save(user);
    }

    public void removeUser(long id) {
        userDao.deleteById(id);
    }

    public void updateUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userDao.save(user);
    }

    public User getUserByUsername(String username) {
        return userDao.getUserByUsername(username);
    }


}


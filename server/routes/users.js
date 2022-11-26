const express = require('express');
const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const {loginValidator, registerValidator} = require('../validators/validators');

const router = express.Router();

router.post('/register', (req, res) => {
    const {error, isValid} = registerValidator(req.body);
    if (!isValid) {
        res.json({succsess: false, errors});
    } else {
        const{firstName, lastName, email, password} = req.body;
        const registerUser = new Users({
            firstName,
            lastName,
            email,
            password,
            createdAt: Date.now()
        });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(registerUser.password, salt, (err, hash) => {
                if (err) throw err;
                registerUser.password = hash;
                registerUser.save().then(user => {
                    res.json({succsess: true, user});
                }).catch(err => {
                    res.json({succsess: false, err});
                });
            });
        });
    }

});

module.exports = router;



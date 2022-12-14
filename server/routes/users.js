const express = require('express');
const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const {loginValidator, registerValidator} = require('../validators/validators');

const router = express.Router();

router.post('/login', (req, res) => {
    const {errors, isValid} = loginValidator(req.body);
    if (!isValid) {
        res.json({ succsess: false, errors });
    } else {
        Users.findOne({email: req.body.email}).then(user => {
            if (!user) {
                res.json({succsess: false, errors: {email: 'Email not found'}});
            } else {
                bcrypt.compare(req.body.password, user.password).then(success => {
                    if (!success) {
                        res.json({succsess: false, errors: {password: 'Password is incorrect'}});
                    } else {
                        const payload = {
                            id: user.id,
                            name: user.firstName
                        }
                        jwt.sign(
                            payload,
                            process.env.APP_SECRET, { expiresIn: 2155926 },
                            (err, token) => {
                                res.json({
                                    user,
                                    token: 'Bearer token: ' + token,
                                    succsess: true
                                })
                            }
                        );
                    }
                });
            }
        });
    }

});


router.post('/register', (req, res) => {
    const {errors, isValid} = registerValidator(req.body);
    if (!isValid) {
        res.json({ succsess: false, errors });
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
            bcrypt.hash(registerUser.password, salt, (hassErr, hash) => {
                if (err || hassErr) {
                    res.json({ message: "Error hashing password", success: false });
                    return;
                }
                registerUser.password = hash;
                registerUser.save().then(user => {
                    res.json({"messager": "User created", "success": true});
                }).catch(err => res.json({message: er.message, success: false}));
            });
        });
        }
});


router.get('/:id', checkAuth, (req, res) => {
    Users.findOne({_id: req.params.id}).then(user => {
        res.json({user, succsess: true});
    }).catch(er => {
        res.json({ success: false, message: er.message });
    });
});

module.exports = router;



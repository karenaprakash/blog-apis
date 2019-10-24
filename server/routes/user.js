const express = require('express');
const { body } = require('express-validator/check');
const router = express.Router();
const { 
        signupUser,
        loginUser
        
        } = require('../controllers/user')
const {User} = require('../models/user');

// POST : /user/signup 
router.post('/signup',[
    body('email')
    .isEmail()
    .withMessage('Please enter valid email.')
    .custom((value,{req})=>{
        return User.findOne({email : value})
        .then(user=>{
            if(user){
                return Promise.reject('E-mail already exists!');
            }
        })
    }).normalizeEmail(),
    body('password')
    .trim()
    .isLength({ min : 5 }).withMessage('Please enter valid password.'),
    body('name')    
    .trim()
    .not()
    .isEmpty().withMessage('Please enter valid name.')

],signupUser);

//POST : /user/login
router.post('/login',[
    body('email')
    .isEmail()
    .withMessage('Please enter valid email.')
    .normalizeEmail(),
    body('password')
    .trim()
    .isLength({ min : 5 }).withMessage('Please enter valid password.'),
],loginUser)

module.exports = router;
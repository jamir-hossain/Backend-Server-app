const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator');

// Controller
const {getAllUser, userRegistration, getSingleUser, userLogin, userLogout} = require('../Controllers/userController')

// Middleware
const { auth }= require('../ourMiddleware/auth')

// Get Register User
router.get('/registered-user', getAllUser)


// Get Single
router.get('/my-account', auth, getSingleUser)

// User Registration
router.post('/registration', [
   check('firstName', "First Name is Required").notEmpty(),
   check('lastName', "Last Name is Required").notEmpty(),
   check('email', "Email is Required").notEmpty(),
   check('email', "Email must will be valid").isEmail(),
   check('password', "Password is Required").notEmpty(),
   check('password', "Password Will Be Minimum 8 Character and Maximum 20 Character").isLength({min: 8, max:20}),
   check('password').custom( (value) => {
      if (value === 'password' || 'PASSWORD') {
         throw new Error('Password Not Wil Be "password"')
      }else{
         return true
      }
   }),
   check('confirmPassword', "Confirm Password is Required").notEmpty(),
   check('confirmPassword').custom( (value, {req}) => {
      if (value !== req.body.password) {
         throw new Error('Confirm password is not matched')
      }else{
         return true
      }
   }) 
], userRegistration)

// Login user
router.post('/login', userLogin)

// Login user
router.post('/logout', auth, userLogout)


module.exports = router
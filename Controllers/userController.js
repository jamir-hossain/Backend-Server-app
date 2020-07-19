const UserRegistration = require('../model/user-registration');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')



module.exports.getAllUser = async(req, res) => {
   try {
      const allUser = await UserRegistration.find()
      res.send(allUser)
   } catch (error) {
      req.send(error.message)
   }
}

module.exports.getSingleUser = async(req, res) => {
   try {
      const inputId = req.user._id
      console.log(inputId)
      const singleUser = await UserRegistration.findById(inputId)
      res.send(singleUser)
   } catch (error) {
      res.send("You are not signed in user")
   }
}

module.exports.userRegistration = async(req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty) {
      res.status(400).send(errors.array())
   }
   try {
      let registration = new UserRegistration(req.body)
      let usedEmail = await UserRegistration.findOne({email: req.body.email});
      if (usedEmail) {
         res.status(400).send('This email is already used')
      }
      await registration.save();
      res.send(registration)
   } catch (error) {
      res.status(500).send(error.message)
   }
}


module.exports.userLogin = async(req, res) => {
   const {email, password} = req.body;
   try {
      // Check user email
      const correctUser = await UserRegistration.findOne({email});
      if (!correctUser) {
         res.status(400).send('Your Email Not Match')
      }
      // Check user password
      const correctPassword = bcrypt.compare(password, correctUser.password);
      if (!correctPassword) {
         res.status(400).send('Your password is not match')
      }

      // Generate Auth Token form user-registration.js
      const token = correctUser.generateAuthToken();
      res.cookie('auth', token, {
         httpOnly: true,
         sameSite: true,
         signed: true,
         maxAge: 4*60*60*1000
      });

      // Successful message
      res.send('Login Successful')
   } catch (error) {
      res.status(500).send("Internal Error")
   }
}


module.exports.userLogout = (req, res) => {
   res.clearCookie('auth')
   res.send('Logout Successful')
}
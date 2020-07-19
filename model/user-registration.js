const mongoose = require('mongoose');
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userRegistration = new mongoose.Schema({
   firstName: {
      type: String,
      required: [true, "First Name is Required"],
      minlength: [3, "First Name Will Be Minimum 3 Character"],
      maxlength: [10, "First Name Will Be Minimum 8 Character"]
   },
   lastName: {
      type: String,
      required: [true, "Last Name is Required"],
      minlength: [3, "Last Name Will Be Minimum 3 Character"],
      maxlength: [10, "Last Name Will Be Minimum 8 Character"]
   },
   email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
      trim: true,
      validate: {
         validator(value){
            return validator.isEmail(value)
         },
         message: 'Email is not valid'
      }
   },
   password: {
      type: String,
      required: true, 
      minlength: [8, "Password Will Be Minimum 8 Character"],
      maxlength: [20, "Password Will Be Minimum 20 Character"],
      validate: {
         validator(value){
            return !value.includes('password')
         },
         message: 'Password Not Wil Be "password"'
      }
   }
})

// Generate Token here
userRegistration.methods.generateAuthToken = function () {
   const token = jwt.sign({id: this._id}, 'secretKey', {expiresIn: '4h'});
   return token;
}

// The password is being hashed here.
userRegistration.pre('save', async function (next) {
   let hashedPassword = await bcryptjs.hash(this.password, 8);
   if (this.isModified('password')) {
      this.password = hashedPassword;
   }
   next()
})

const UserRegistration = mongoose.model('UserRegistration', userRegistration);
module.exports = UserRegistration;
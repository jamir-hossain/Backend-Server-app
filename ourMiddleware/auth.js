const jwt = require('jsonwebtoken')
const Users = require('../model/user-registration')


module.exports.auth = async(req, res, next) => {
   if (req.signedCookies) {
      try {
         // Accessing Cookie
         const cookieToken = req.signedCookies['auth']
         // Verify Token
         const verified = jwt.verify(cookieToken, 'secretKey')
         // Verified User
         const verifiedUser = await Users.findById(verified.id)
         req.user = verifiedUser
         next()
      } catch (error) {
         res.status(500).send('You are not sign in user. Please Sign in.')
      }
   }else{
      res.status(401).send('You are not Sing In user')
   }
}
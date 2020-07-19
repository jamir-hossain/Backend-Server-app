const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator');

// Our Middleware
const {auth} = require('../ourMiddleware/auth')

// Controller
const {addDataController, updateDataController, getAllDataController, getSingleDataController, deleteDataController} = require('../Controllers/dataController')


// Home Page
router.get('/', (req, res)=> {
   res.send("<h1>This is our Home page</h1>")
})


// Get All Data
router.get('/all-students', getAllDataController)


// Get Single Data
router.get('/student/:inputId', [
   check('inputId').isMongoId()
], getSingleDataController)


// Add or Post Data on Server
router.post('/post', [
   auth,
   check('name').notEmpty().withMessage("Name field is require").isLength({min:5, max:15}).withMessage('Length Must Be 5 to 15 Character'),
   check('roll').notEmpty().withMessage('Roll field is require'),
   check('department').notEmpty().withMessage("Name field is require").isLength({min:10, max:25}).withMessage('Department Must Be 5 to 15 Character')  
], addDataController)


// Update Users Data
router.put('/update/:inputId', auth, updateDataController)


// Delete Single Data from Database
router.delete('/delete/:inputId', [
   auth,
   check('inputId').isMongoId()
], deleteDataController)


module.exports = router
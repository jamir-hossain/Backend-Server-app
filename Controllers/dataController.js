const PostData = require('../model/inputData')
const { check, validationResult } = require('express-validator');
// Our Middleware
const { auth } = require('../ourMiddleware/auth')


module.exports.addDataController = async(req, res) => {
   const inputData = req.body;
   const errors = validationResult(req);
   if (!errors.isEmpty) {
      res.status(400).send(errors.array())
   }
   try {
      const addedData = new PostData({...inputData, owner: req.user._id});
      await addedData.save()
      res.send(addedData)
   } catch (error) {
      res.status(500).send(error.message)
   }
}


module.exports.updateDataController = async(req, res) => {
   const inputId = req.params.inputId;   
   const editedData = req.body;
   const gotEditedData = Object.keys(editedData);
   const allowUpdate = ['name','roll', 'department']
   const isAllowed = gotEditedData.every(update => allowUpdate.includes(update));
   if (!isAllowed) {
      res.status(400).send("You can just update Name, Roll, and Department.")
   }
   try {
      // Used by Mongoose
      let updatedData = await PostData.findOneAndUpdate(
         {_id: inputId, owner: req.user._id},
         req.body, {new:true, runValidators:true}
         );
      if (!updatedData) {
         res.status(500).send('Student Data is Not Found')
      }
      res.send(updatedData)
   } catch (error) {
      res.send(error.message)
   }
}

module.exports.getAllDataController = async(req, res) => {
   // console.log(req.user)
   try {
      const allData = await PostData.find()
      res.send(allData)
   } catch (error) {
      res.status(500).send('Student Data is Not Found')
   }
}

module.exports.getSingleDataController = async(req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty) {
      res.status(404).send('User not found')
   }
   try {
      const inputID = req.params.inputId;
      const singleData = await PostData.findById(inputID).populate('owner');
      res.send(singleData)
   } catch (error) {
      res.status(400).send('Invalid Input Id')
   }
}


module.exports.deleteDataController = async(req, res) => {
   const inputID = req.params.inputId;
   const errors = validationResult(req);
   if (!errors.isEmpty) {
      res.status(404).send('Data is not found')
   }
   try {
      let deleteData = await PostData.findOneAndDelete(
         {_id: inputID, owner: req.user._id}
         );
      if (!deleteData) {
         res.status(404).send('Data is Not Found')
      }
      res.send(deleteData)
   } catch (error) {
      res.status(400).send('Invalid Input Id')
   }
}

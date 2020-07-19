const mongoose = require('mongoose');

module.exports.DBConnection = async () => {
   try {
      await mongoose.connect('mongodb://localhost:27017/backendServerData', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
      console.log("Database is successfully connected")
   } catch (error) {
      res.send('Connection Failed. Internal Server Error')
   }
}
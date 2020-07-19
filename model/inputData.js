const mongoose = require('mongoose');

const postUserData = new mongoose.Schema({
   name: {
      type: String,
      required: [true, "Name is required"],
      minlength: 6,
      maxlength: 15
   },
   roll: {
      type: Number,
      required: [true, "Roll is required"]
   },
   department: {
      type: String,
      required: [true, "Department is required"],
      minlength: 6,
      maxlength: 25
   },
   owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserRegistration',
      required: true
   }
}, 
{timestamps: true}
);

const PostData = mongoose.model("PostData", postUserData);
module.exports = PostData
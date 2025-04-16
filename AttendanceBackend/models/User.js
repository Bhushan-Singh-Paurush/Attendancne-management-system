const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required:true,
    trim:true
  },
  lastName: {
    type: String,
    trim:true
  },
  password: {
    type: String,
    required:true,
    trim:true
  },
  email: {
    type: String,
    required:true,
    trim:true
  },
  accountType:{
    type:String,
    required:true,
    enum:["Student","Teacher","Admin"]
  },
  subjects:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Subject"
      }
  ],
  token:{
    type:String
  },
  createdAt:{
    type:Date
  },
  image:{
     type:String
  },
  public_id:{
    type:String
  }
});

module.exports=mongoose.model("User",userSchema)
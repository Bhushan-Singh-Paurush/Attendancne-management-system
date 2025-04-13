const mongoose = require('mongoose');

const  courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required:true,
    trim:true
  },
  courseDesp: {
    type: String,
    required:true,
    trim:true
  },
  years: {
    type: Number,
    required:true,
  },
  branches: {
    type: String
  }
});

module.exports=mongoose.model("Course",courseSchema)
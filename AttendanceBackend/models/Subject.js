const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required:true,
    trim:true
  },
  subjectCode: {
    type: String,
    required:true,
    trim:true
  },
  subjectTeacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
  },
  section: {
    type:String,
    required:true
  },
  Semester: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Semester"
  }
});

module.exports=mongoose.model("Subject",subjectSchema)
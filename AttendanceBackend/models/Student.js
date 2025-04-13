const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required:true,
    trim:true
  },
  rollNumber: {
    type: Number,
    required:true,
    trim:true
  },
  section: {
    type: String,
    required:true,
  },
  semester: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Semester",
    required: true
  },
  date:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:"DateData"
      }
  ]
});

module.exports=mongoose.model("Student",studentSchema)
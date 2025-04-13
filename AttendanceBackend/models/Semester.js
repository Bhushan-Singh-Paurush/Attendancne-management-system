const mongoose = require('mongoose');

const semesterSchema= new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Course",
    required:true
  },
  branch: {
    type: String,
  },
  year: {
    type: Number,
    required:true
  },
  semNo: {
    type: Number,
    required:true
  },
  subjects:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Subject"
      },
  ],
  students:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Student"
      }
  ]
});

module.exports=mongoose.model("Semester",semesterSchema)
const mongoose = require('mongoose');

const dateSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Student",
    required:true
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Subject",
    required:true
  },
  date: {
    type: Date,
    required:true
  },
  status: {
    type: String,
    enum:["Present","Absent","Leave"]
  }
});
module.exports=mongoose.model("DateData",dateSchema)
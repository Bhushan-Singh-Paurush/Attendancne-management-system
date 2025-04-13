const express = require("express")
const upload=require("../MiddleWare/Multer")
const { createStudent, updateStudent, deleteStudent, getStudents } = require("../Controller/Student")

const Router = express.Router()

Router.post("/createStudent",createStudent)

Router.patch("/updateStudent",upload.none(),updateStudent)

Router.delete("/deleteStudent",deleteStudent)

Router.get("/getStudents",getStudents)

module.exports=Router
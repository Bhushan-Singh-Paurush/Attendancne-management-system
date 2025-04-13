const express =  require("express")
const upload=require("../MiddleWare/Multer")
const { createSemester, deleteSemester, editSemester, getAllSemester, semesterDetails } = require("../Controller/Semester")

const Router=express.Router()

Router.post("/createSemester",createSemester)

Router.delete("/deleteSemester",deleteSemester)

Router.patch("/editSemester",upload.none() ,editSemester)

Router.get("/getAllSemester",getAllSemester)

Router.post("/semesterDetails",semesterDetails)

module.exports=Router
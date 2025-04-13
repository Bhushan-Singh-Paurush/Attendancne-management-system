const express=require("express")
const { createCourse, getAllCourses, editCourse } = require("../Controller/Course")
const { auth, isAdmin } = require("../MiddleWare/auth")
const upload = require("../MiddleWare/Multer")
const Router=express.Router()

Router.post("/createCourse",auth ,isAdmin,createCourse)

Router.get("/getAllCourses",getAllCourses)

Router.put("/editCourse",upload.none(),auth,isAdmin,editCourse)

module.exports=Router
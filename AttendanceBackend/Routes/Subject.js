const express = require("express")
const upload=require("../MiddleWare/Multer")
const { createSubject, editSubject, deleteSubject, getAllSubjects } = require("../Controller/Subject")
const { auth, isAdmin,  } = require("../MiddleWare/auth")

const Router = express.Router()

Router.post("/createSubject",auth,isAdmin,createSubject)

Router.patch("/editSubject",upload.none(),editSubject)

Router.delete("/deleteSubject",auth,isAdmin,deleteSubject)

Router.get("/getAllSubjects",getAllSubjects)

module.exports=Router
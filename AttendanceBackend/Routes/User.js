const express=require("express")
const { signup, sendOTP, login, editProfile, getUserDetail, changePassword, deleteUser, allTeachers, logout } = require("../Controller/Auth")
const { auth } = require("../MiddleWare/auth")
const upload = require("../MiddleWare/Multer")

const Router=express.Router()

Router.post("/sendOTP",sendOTP)

Router.post("/signup",signup)

Router.post("/login",login)

Router.patch("/editProfile",upload.single("file"), auth,editProfile)

Router.get("/getUserDetail",auth,getUserDetail)

Router.patch("/changePassword",auth,changePassword)

Router.delete("/deleteUser",auth,deleteUser)

Router.get("/allTeachers",allTeachers)

Router.get("/logout",logout)

module.exports=Router
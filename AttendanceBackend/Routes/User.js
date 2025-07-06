const express=require("express")
const { signup, sendOTP, login, editProfile, changePassword, deleteUser, allTeachers, logout, tokenRegenerate } = require("../Controller/Auth")
const { auth } = require("../MiddleWare/auth")
const upload = require("../MiddleWare/Multer")

const Router=express.Router()

Router.post("/sendOTP",sendOTP)

Router.post("/signup",signup)

Router.post("/login",login)

Router.patch("/editProfile",upload.single("file"), auth,editProfile)

Router.patch("/changePassword",auth,changePassword)

Router.delete("/deleteUser",auth,deleteUser)

Router.get("/allTeachers",allTeachers)

Router.get("/logout",logout)

Router.get("/refresh",tokenRegenerate)

module.exports=Router
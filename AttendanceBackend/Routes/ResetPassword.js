const express = require("express")
const { sendRestLink, resetPassword } = require("../Controller/ResetPassword")
const Router=express.Router()

Router.patch("/sendRestLink",sendRestLink)

Router.patch("/resetPassword",resetPassword)

module.exports=Router
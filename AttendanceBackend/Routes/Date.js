const express = require("express")
const { createDate, updateDate, getDates } = require("../Controller/Date")

const Router=express.Router()

Router.post("/createDate",createDate)

Router.patch("/updateDate",updateDate)

Router.get("/getDates",getDates)
module.exports=Router
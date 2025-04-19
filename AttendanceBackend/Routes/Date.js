const express = require("express")
const { createDate, updateDate, getDates, getAllSemesterDates } = require("../Controller/Date")

const Router=express.Router()

Router.post("/createDate",createDate)

Router.patch("/updateDate",updateDate)

Router.get("/getDates",getDates)

Router.get("/getAllSemesterDates",getAllSemesterDates)

module.exports=Router
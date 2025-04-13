const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const cookieParser=require("cookie-parser")
const fs=require("fs")

const authRouter=require("./Routes/User")
const resetpassRouter=require("./Routes/ResetPassword")
const courseRouter=require("./Routes/Course")
const semesterRouter=require("./Routes/Semester")
const dateRouter=require("./Routes/Date")
const subjectRouter=require("./Routes/Subject")
const studentRouter=require("./Routes/Student")

app.use(express.json())
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}))
app.use(cookieParser())
app.use("/api1/auth",authRouter)
app.use("/api1/resetpass",resetpassRouter)
app.use("/api1/course",courseRouter)
app.use("/api1/semester",semesterRouter)
app.use("/api1/date",dateRouter)
app.use("/api1/subject",subjectRouter)
app.use("/api1/student",studentRouter)

const port = process.env.PORT || 5500 

if (!fs.existsSync("./public")) {
    fs.mkdirSync("./public");
}

if(fs.existsSync("./public/images") || fs.mkdirSync("./public/images")){}

app.listen(port  ,()=>{
    console.log(`server is running at port ${port}`);
})
require("./config/DBconnection").dbconnection()
require("./config/Cloudinary").Cloudinary()
const Course = require("../models/Course")

exports.createCourse=async(req,res)=>{
    try {
        const{courseName,courseDesp,years,branches}=req.body
        
        if(!courseName || !courseDesp || !years){
            return res.status(400).json({
                success:false,
                message:"Please provide all fields"
            })
        }
        const course =await Course.create({courseName,courseDesp,years,branches})
        
        return res.status(200).json({
            success:false,
            message:"Course created successfully",
            course
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Course not created",
            error:error.message
        })
    }
}
exports.getAllCourses=async(req,res)=>{
    try {
        const courses=await Course.find({})
        
        return res.status(200).json({
            success:false,
            message:"All courses",
            courses
        })

    } catch (error) {
        return res.status(500).json({
            success:true,
            message:error.message,
        })
    }
}
exports.editCourse=async(req,res)=>{
    try {
        const data=req.body
        const{courseId}=req.body

        if(!courseId){
            return res.status(400).json({
                success:false,
                message:"Course id not found"
            })
        }

        const updatedCourse=await Course.findByIdAndUpdate(courseId,data,{new:true})

        return res.status(200).json({
            success:true,
            message:"Updated course",
            updatedCourse
        })

    } catch (error) {
        return res.status(500).json({
            success:true,
            message:error.message,
        })
    }
}
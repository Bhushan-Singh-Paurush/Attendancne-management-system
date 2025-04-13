const Student = require("../models/Student")
const DateData = require("../models/Date")
const Semester = require("../models/Semester")

exports.createStudent=async(req,res)=>{
    try {
        const{studentName,rollNumber,semesterId,section}=req.body
        
        if(!studentName || !rollNumber || !semesterId || !section){
            return res.status(400).json({
                success:"provide all fields"
            })
        }
        const checkStudent=await Student.findOne({rollNumber,semester:semesterId,section})
        
        if(checkStudent){
            return res.status(400).json({
                success:false,
                message:"Student Already Exist"
            })
        }
        const newStudent = await Student.create({studentName,rollNumber,semester:semesterId,section})
        
        await Semester.findByIdAndUpdate(semesterId,{$push:{students:newStudent._id}},{new:true})
        
        return res.status(200).json({
            success:true,
            message:"Student created successfully",
            newStudent
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Student not created",
            error:error.message
        })
    }
}
exports.updateStudent=async(req,res)=>{
    try {
        const{studentId}=req.body
        const data=req.body
        if(!studentId){
            return res.status(400).json({
                success:false,
                message:"Student ID not found"
            })
        }
        
        const updatedStudent = await Student.findByIdAndUpdate(studentId,data,{new:true})

        return res.status(200).json({
            success:false,
            message:"student updated successfully",
            updatedStudent
        })
       
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"student not updated",
            error:error.message
        })
    }
}
exports.deleteStudent=async(req,res)=>{
    try {
        const{studentId}=req.body

        if(!studentId){
            return res.status(400).json({
                success:false,
                message:"Student ID not found"
            })
        }

        const student = await Student.findById(studentId)

        if(!student){
            return res.status(400).json({
                success:false,
                message:"Student not found"
            })
        }

       if(student.date?.length>0)
       {
        try {
            await DateData.deleteMany({_id:{$in:student.date}})
            console.log("All the dates deleted successfully");
        } catch (error) {
            console.log(error.message);
        }
       }
        
        const updatedSemester = await Semester.findByIdAndUpdate(student.semester,{$pull:{students:studentId}},{new:true})
        
        await Student.findByIdAndDelete(studentId)

        return res.status(200).json({
            success:true,
            message:"Student deleted successfully",
            updatedSemester
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Student not deleted",
            error:error.message
        })
    }
}

exports.getStudents=async(req,res)=>{
    try {
        const{semesterId,section,date}=req.query

        if(!semesterId || !section){
            return res.status(400).json({
                success:false,
                message:"Provide all fields"
            })
        }

        const semester= await Semester.findById(semesterId).populate({
            path:"students",
            match:{
                section:section
            },
            populate:{
                path:"date",
                match:{
                    date:date
                }
            }
        }).populate("course")
        
        return res.status(200).json({
            success:true,
            message:"All Students",
            semester
        })
    } catch (error) {
        
        return res.status(500).json({
            success:false,
            message:"Student not found",
           
        })
    }
}
const Sem = require("../models/Semester")
const Student = require("../models/Student")
const Subject = require("../models/Subject")
const User = require("../models/User")
const DateData = require("../models/Date")

exports.createSubject=async(req,res)=>{
    try {
        const{subjectName,subjectCode,section,Semester,subjectTeacher}=req.body
        
        if(!subjectName || !subjectCode || !section || !Semester || !subjectTeacher)
        {
            return res.status(400).json({
                sucess:false,
                message:"Provide all fields"
            })
        }
        
        const checkSubject = await Subject.findOne({subjectCode,section,Semester})
 
        if(checkSubject){
            return res.status(400).json({
                success:false,
                message:"This subject is already created"
            })
        }

        const subject = await Subject.create({subjectName,subjectCode,section,Semester,subjectTeacher})

        const user = await User.findByIdAndUpdate(subjectTeacher,{$push:{subjects:subject._id}},{new:true}).populate("subjects")
        
        await Sem.findByIdAndUpdate(Semester,{$push:{subjects:subject._id}})

        const subjectData=await subject.populate({
            path:"subjectTeacher",
            select:"firstName lastName _id"
        })
        return res.status(200).json({
            success:false,
            message:"Subject created successfully",
            subjectData
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Subject not created",
            error:error.message
        })
    }
}
exports.deleteSubject=async(req,res)=>{
    try {
        const{subjectId,semesterId,userId}=req.body

        if(!subjectId || !semesterId || !userId){
            return res.status(400).json({
                success:false,
                message:"provide all fields"
            })
        }

        await Sem.findByIdAndUpdate(semesterId,{$pull:{subjects:subjectId}},{new:true})
        
       await User.findByIdAndUpdate(userId,{$pull:{subjects:subjectId}})
        
       const dates=await DateData.find({subjectId:subjectId})

       const dateIsToRemove=dates.map(element=>element._id)

       if(dateIsToRemove?.length>0)
       {
        await Student.updateMany({},{$pull:{date:{$in:dateIsToRemove}}})
        await DateData.deleteMany({_id:{$in:dateIsToRemove}}) 
       }
       
       await Subject.findByIdAndDelete(subjectId)        
        
        return res.status(200).json({
            success:true,
            message:"Subject deleted successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Subject not deleted",
            error:error.message
        })
    }
}
exports.editSubject=async(req,res)=>{
    try {
        const{subjectId}=req.body
        const data =req.body
        if(!subjectId){
            return res.status(400).json({
                success:false,
                message:"Subject Id not found"
            })
        }

        const updatedSubject = await Subject.findByIdAndUpdate(subjectId ,data,{new:true}).populate({
            path:"subjectTeacher",
            select:"firstName lastName _id"
        })

        return res.status(200).json({
            success:false,
            message:"Subject updated successfully",
            updatedSubject
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Subject not updated",
            error:error.message
        })
    }
}



exports.getAllSubjects=async(req,res)=>{
    try {
        const id=req.query.id
    
        if(!id){
            return res.status(400).json({
                success:false,
                message:"Id not found"
            })
        }

        const subjects=await Subject.find({subjectTeacher:id})
        
        return res.status(200).json({
            success:true,
            message:"All subjects",
            subjects
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"No subject found"
            
            
        })
    }
}
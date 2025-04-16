const Semester = require("../models/Semester")
const Subject = require("../models/Subject")
const DateData = require("../models/Date")
const Student = require("../models/Student")
const User = require("../models/User")
exports.createSemester=async(req,res)=>{
    try {
        const{courseId,branch,year,semNo}=req.body

        if(!courseId || !year || !semNo){
            return res.status(400).json({
                success:false,
                message:"Provide all fields properly"
            })
        }

        const checkSemester=await Semester.findOne({course:courseId,year:year,branch:branch,semNo:semNo})
       
        if(checkSemester){
            return res.status(400).json({
                success:false,
                message:"This semester is already created"
            })
        }

        const sem=await Semester.create({branch,year,semNo,course:courseId})
        updatedSem=await sem.populate("course")  
        return res.status(200).json({
            success:true,
            message:"Semester created successfully",
            updatedSem
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Semester not created",
            error:error.message
        })
    }
}

exports.deleteSemester=async(req,res)=>{
    try {
        const{semesterId}=req.body
        if(!semesterId){
            return res.status(400).json({
                success:false,
                message:"Provide semester Id"
            })
        }
        
        const sem = await Semester.findById(semesterId).populate("students")

        if(!sem){
            return res.status(400).json({
                success:false,
                message:"Semester not found"
            })
        }

        if(sem?.subjects?.length>0)
        {
           try {
            
            await User.updateMany({},{$pull:{subjects:{$in:sem.subjects}}})
            console.log("Subjects removed from the user");
            
            await Subject.deleteMany({Semester:semesterId})
            console.log("All the subjects are deleted");
           
            } catch (error) {
              console.log(error.message);
           }
            
        }
         
        if(sem?.students?.length>0){

            for(let student of sem.students)
            {
                if(student)
                {
                    for(let dateId of student.date)
                    {
                        if(dateId){
                              try {
                                await DateData.findByIdAndDelete(dateId)
                              } catch (error) {
                                console.log(error.message);
                                
                              }
                        }
                    }
                    try {
                        await Student.findByIdAndDelete(student._id)
                    } catch (error) {
                        console.log(error.message);
                    }
                }
            }
            console.log("All the students are deleted");
        }

        await Semester.findByIdAndDelete(semesterId)

        return res.status(200).json({
            success:true,
            message:"Semester deleted successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Semester not deleted",
            error:error.message
        })
    }
}
exports.editSemester=async(req,res)=>{
    try {
        const{semesterId}=req.body
        const data=req.body
        
        if(!semesterId){
            return res.status(400).json({
                success:false,
                message:"Please provide semester id"
            })
        }

        const updatedSemester = await Semester.findByIdAndUpdate(semesterId,data,{new:true}).populate("course")
        
        return res.status(200).json({
            success:false,
            message:"Semester updated successfully",
            updatedSemester
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Semester not updated",
            error:error.message
        })
    }
}
exports.getAllSemester=async(req,res)=>{
    try {
        const{courseId,branch}=req.query
       
        if(!courseId){
            return res.status(400).json({
                success:false,
                message:"Course id not found"
            })
        }

        let semesters=await Semester.find({course:courseId}).populate("course")
        
        if(semesters && branch){
            semesters=semesters.filter(element=>element.branch===branch)
        }
        
        
        return res.status(200).json({
            success:false,
            message:"All semesters",
            semesters
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"semesters not found",
            error:error.message
        })
    }
}

exports.semesterDetails=async(req,res)=>{
    try {
        const{course,branch,section,year,semNo}=req.body

        if(!course || !section || !year || !semNo){
                return res.status(400).json({
                    success:false,
                    message:"Provide all fileds"
                })
        }
        const query={
            course,
            ...(branch && {branch}),
            semNo,
            year
        }
        const semesterDetails=await Semester.findOne(query).populate({
            path:"subjects",
            match:{
                section:section
            },
            populate:{
                path:"subjectTeacher",
                select:"firstName lastName _id"
            }
        }).populate("students")
        
    
        
        return res.status(200).json({
            success:false,
            message:"Semester Detail",
            semesterDetails
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"semesters not found",
            error:error.message
        })
    }
}
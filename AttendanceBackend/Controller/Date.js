const DateData = require("../models/Date")
const Semester = require("../models/Semester")
const Student = require("../models/Student")
exports.createDate=async(req,res)=>{
    try {
       const data =req.body
       
       if(!data){
        return res.status(400).json({
            success:false,
            message:"data not found"
        })
       }
   
       for(let element of data){

        const checkDate=await DateData.findOne({studentId:element.studentId,subjectId:element.subjectId,date:element.date})
        if(!checkDate){
            
            const newDate=await DateData.create(element)
            
            await Student.findByIdAndUpdate(element.studentId,{$push:{date:newDate}})

        }    
    }
       

       return res.status(200).json({
        success:true,
        message:"Date created successfully"
       })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Date not created",
            error:error.message
        })
    }
}
exports.updateDate=async(req,res)=>{
    try {
        const{dateId}=req.body
        const data=req.body
        
        if(!dateId){
            return res.status(400).json({
                success:false,
                message:"Date ID not found"
            })
        }

        const updatedDate = await DateData.findByIdAndUpdate(dateId,data,{new:true})

        return res.status(200).json({
            success:false,
            message:"date updated successfully",
            updatedDate
        })
       
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"date not updated",
            error:error.message
        })
    }
}

exports.getDates=async(req,res)=>{
    try {
        const{semesterId,section,subjectId,input}=req.query

        if(!semesterId || !section || !subjectId || !input){
            return res.status(400).json({
                success:false,
                message:"Provide all fields"
            })
        }
        
        const start=new Date(`${input}-01`)
        const[year,month]=input.split('-')
        const end=new Date(`${year}-${String(Number(month)+1).padStart(2,'0')}-01`)

        const semester=await Semester.findById(semesterId).populate({
            path:"students",
            match:{
                section:section
            },
            populate:{
                path:"date",
                match:{
                    subjectId:subjectId,
                    date:{
                        $gte:start,
                        $lt:end
                    }
                }
            }
        })

      
        
        
        return res.status(200).json({
            success:true,
            message:"All dates",
            semester
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
    })
    }
}
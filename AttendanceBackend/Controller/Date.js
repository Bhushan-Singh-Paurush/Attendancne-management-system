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


exports.getAllSemesterDates=async(req,res)=>{
    try {
        const{course,section,year,semNo,branch}=req.query

        if(!course || !section || !year || !semNo){
            return res.status(400).json({
                success:false,
                message:"Provide all fields"
            })
        }

        const parameter={
            course,
            year,
            semNo,
            ...(branch && {branch})
        }

        const semester=await Semester.findOne(parameter).populate({
            path:"students",
            match:{
                section:section
            },
            populate:{
                path:"date"
            }
        }).populate({
            path:"subjects",
            match:{
                section:section
            }
        })

        if(!semester){
            return res.status(400).json({
                success:false,
                message:"No Semester Found"
            })
        }
        
        const student=semester.students
        const subject=semester.subjects
        const today=new Date().toISOString().split('T')[0]
        

        const summery=subject.map((subject)=>{
              let totalPresent=0
              let todayPresent=0
              let todayAbsent=0
              const dateSet=new Set()
                     
              student.forEach((student)=>{
                
                const attendance=student.date.filter(d=>(d.subjectId.toString()===subject._id.toString()))
                attendance.forEach(element=>{
                    dateSet.add(element.date.toISOString().split('T')[0])
                })
                
                const Present=attendance.filter(element=>element.status==="Present")
                const checkTodayPresent=attendance.filter(element=>(element.date.toISOString().split('T')[0]===today && element.status==="Present"))
                const checkTodayAbsent=attendance.filter(element=>(element.date.toISOString().split('T')[0]===today && element.status==="Absent"))
                

                totalPresent+=Present.length
                todayPresent+=checkTodayPresent.length
                todayAbsent+=checkTodayAbsent.length
              })
              
                
              return {
                subjectName:subject.subjectName,
                avgPresent:dateSet.size===0 ? 0 : Math.floor(totalPresent/dateSet.size),
                todayPresent,
                todayAbsent
              }


        })

        return res.status(200).json({
            success:true,
            message:"All semester detail",
            summery
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
    })
    }
}
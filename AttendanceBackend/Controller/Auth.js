const OTP = require("../models/OTP")
const User = require("../models/User")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const Subject=require("../models/Subject")
const { cloudinaryUpload, cloudinaryDelete } = require("../utils/fileUpload")
require("dotenv").config()
const fs=require("fs")

exports.sendOTP=async(req,res)=>{
    try {
        const{email}=req.body

        if(!email){
            return res.status(400).json({
                success:false,
                message:"Provide email"
            })
        }
        const otp = 10000 + Math.floor(Math.random()*90000)

        await OTP.create({otp,email})

        return res.status(200).json({
            success:true,
            message:"OTP send successfully"
        })
    } catch (error) {
        return res.status(500).json({
        success:false,
        message:"OTP not send",
        error:error.message
        })   
    }
}

exports.signup=async(req,res)=>{
    try {
        const{firstName,lastName,email,password,otp,accountType,pin}=req.body

        if(!firstName || !email || !password || !otp || !accountType || !pin)
          {
            return res.status(400).json({
                success:false,
                message:"provide all fields properly"
            })
          }
        
        const checkEmail = await User.findOne({email:email})
        
        if(checkEmail){
            return res.status(400).json({
                success:false,
                message:"this email is allready register with us"
            })
        }
        if(pin!==process.env.SECRET_PIN){
            return res.status(400).json({
                success:false,
                message:"wrong Secret pin"
            })
        }
        const getotp=await OTP.find({email:email}).sort({createdAt:-1})
        
        if(otp != getotp?.[0].otp)
        {
            return res.status(400).json({
                success:false,
                message:"OTP mismatched"
            })
        }

        const securePassword=await bcrypt.hash(password,10)
        
        await User.create({firstName,lastName,email,password:securePassword,accountType})

        return res.status(200).json({
            success:true,
            message:"Account created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"account is not created",
            error:error.message
        })
        
    }
}

const createTokens=(user)=>{
      
      const accessToken=jwt.sign({
        id:user._id,
        accountType:user.accountType,
        email:user.email
      },process.env.SECRET,
      {expiresIn:'15min'}
    )

     const refreshToken=jwt.sign({
       id:user._id,
       email:user.email       
     },process.env.SECRET,
    {expiresIn:'7d'}
    )

    return {accessToken,refreshToken}
}
exports.login=async(req,res)=>{
    try {
        const{email,password}=req.body

        if(!email || !password)
        {
            return res.status(400).json({
                success:false,
                message:"Provide all fields"
            })
        }

        const user = await User.findOne({email:email})

        if(!user){
            return res.status(400).json({
                success:false,
                message:"this email is not register with us"
            })
        }

        const comparePassword = await bcrypt.compare(password,user.password)
        
        if(!comparePassword){
            return res.status(400).json({
                success:false,
                message:"Password Mismatched"
            })  
            
        }
        const{accessToken,refreshToken}=createTokens(user)

        user.refreshToken=refreshToken

        await user.save();

        const option={
            maxAge:7*24*60*60*1000,
            httpOnly:true,
           // secure:process.env.PRODUCTION==='production' ? true : false,
           // sameSite:'none'
            
        } 
        
        user.password=undefined
        user.refreshToken=undefined
        user.token=undefined
        return res.cookie("refreshToken",refreshToken,option).status(200).json({
            success:true,
            message:"logged in successfully",
            user,
            accessToken
        })
        
    } catch (error) {
        
        return res.status(500).json({
            success:false,
            message:"Login failed",
            error:error.message
        })
    }
}

exports.tokenRegenerate=async(req,res)=>{
    try {
        const token=req.cookies["refreshToken"]
        if(!token){
            return res.status(400).json({
                success:false,
                message:"Refresh token not found"
            })
        }
        const decode=jwt.verify(token,process.env.SECRET)
        
        const user=await User.findById(decode.id)

        
        if(!user || user.refreshToken != token)
        {
            return res.status(400).json({
                success:false,
                message:'invalid token'
            })
        }
        const{accessToken,refreshToken}=createTokens(user)
    
        user.refreshToken=refreshToken

        await user.save()

        user.password=undefined
        user.refreshToken=undefined
        user.token=undefined
        
        const options={
            maxAge:7*24*60*60*1000,
            httpOnly:true,
           // secure:process.env.PRODUCTION==='production' ? true : false,
           // sameSite:'none'
            
        }
        return res.cookie("refreshToken",refreshToken,options).status(200).json({
           success:true,
           user,
           accessToken
        })
    } catch (error) {
      console.log(error);
        
        return res.status(403).json({
            success:false,
            message:error.message
        })
    }
}

exports.editProfile=async(req,res)=>{
    try {
        
        const data = req.body
        const file=req.file
        const id = req.id
        
        if(!data){
            return res.status(400).json({
                success:false,
                message:"Provide some data"
            })
        }
        
        if(!id){
            return res.status(400).json({
                success:false,
                message:"ID not found"
            })
        }

        const user = await User.findById(id)

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }

        if(file){
            
            if(user?.public_id)
            {
                await cloudinaryDelete(user.public_id) 
            }

            const result = await cloudinaryUpload(file,process.env.FOLDER_NAME)
            fs.unlinkSync(file.path)

            if(result){
                data.image=result.secure_url
                data.public_id=result.public_id
            }
        }
        const updateUser = await User.findByIdAndUpdate(id,data,{new:true})
       
        updateUser.password=undefined
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            updateUser
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"profile not updated",
            error:error.message
        })
    }
}

exports.changePassword=async(req,res)=>{
    try {
        const{password}=req.body
        const id=req.id

        if(!password || !id){
            return res.status(400).json({
                success:false,
                message:"Provide all fields"
            })
        }
        
        const securePassword=await bcrypt.hash(password,10)

        const updatedUser=await User.findByIdAndUpdate(id,{password:securePassword},{new:true})
        
        updatedUser.password=undefined
        return res.status(200).json({
            success:true,
            message:"Password change successfully",
            updatedUser
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Password not changed"
        })
    }
}
exports.deleteUser=async(req,res)=>{
    try {
        const id=req.id
        
        if(!id){
            return res.status(400).json({
                success:false,
                message:"Provide the user Id"
            })
        }
        
        const user=await User.findById(id)

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }

        await Subject.updateMany({subjectTeacher:id},{$set:{subjectTeacher:null}})
     
        if(user.public_id){
            await cloudinaryDelete(user.public_id)
        } 
        
        await User.findByIdAndDelete(id)
        
        return res.status(200).json({
            success:true,
            message:"Account deleted Successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Account not delete"
        })
    }
}
exports.allTeachers=async(req,res)=>{
    try {
        const teachers=await User.find({accountType:"Teacher"}).select("firstName lastName _id")

        if(teachers.length===0){
            return res.status(400).json({
                success:false,
                message:"No teacher found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"All Teachers",
            teachers
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.logout=async(req,res)=>{
    try {
       const token=req.cookies["refreshToken"]
       
       
       if(!token){
        return res.status(200).json({
            success:true,
            message:"Logout successfully"
        })
    }
       
       const user=await User.findOne({refreshToken:token})

       user.refreshToken=null

       await user.save()
       
       return res.status(200).json({
            success:true,
            message:"Logout successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }    
}
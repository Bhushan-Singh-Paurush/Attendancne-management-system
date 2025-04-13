const jwt=require("jsonwebtoken")
require("dotenv").config()

exports.auth=async(req,res,next)=>{
    try {
        const token= req.cookies["token"]
           
        if(!token){
            return res.status(400).json({
                success:false,
                message:"token not fount"
            })
        }
        const decodedToken=jwt.verify(token,process.env.SECRET)
        
        if(!decodedToken){
            return res.status(400).json({
                success:false,
                message:"token expire please re-login"
            })
        }  
        req.id=decodedToken.id,
        req.accountType=decodedToken.accountType
        next()
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Authorization failed",
            error:error.message
        })
    }
}
exports.isAdmin=async(req,res,next)=>{
    try {
        if(req.accountType!=="Admin")
        {
            return res.status(400).json({
                success:false,
                message:"This is protected route for admin only"
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
exports.isTeacher=async(req,res,next)=>{
    try {
        if(req.accountType!=="Teacher")
        {
            return res.status(400).json({
                success:false,
                message:"This is protected route for Teacher only"
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
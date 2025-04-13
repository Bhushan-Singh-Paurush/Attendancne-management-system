const cloudinary=require("cloudinary").v2

exports.cloudinaryUpload=async(file,folder)=>{
    const option={
        folder,
        resource_type:"auto"
    }
     try {
        return await cloudinary.uploader.upload(file.path,option)    
     } catch (error) {
        console.log(error.message);
     }
    
}
exports.cloudinaryDelete=async(public_id)=>{
    try {
        return await cloudinary.uploader.destroy(public_id)
    } catch (error) {
        console.log(error.message);
    }
}
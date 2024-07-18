import {v2 as cloudinary} from "cloudinary";
import fs from "fs"


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET_KEY
});


const uploadOnCloudinary = async(localfilepath) => {
    try {
        if(!localfilepath) return null;
        
        const response = await cloudinary.uploader.upload(localfilepath,{
            resource_type:"auto"
        });
        // console.log(response);
        console.log("file is uploaded");
        fs.unlinkSync(localfilepath)
        return response
    } catch (error) {
        console.log(error);
        fs.unlinkSync(localfilepath)
        return null
    }
}

export default uploadOnCloudinary;

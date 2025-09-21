import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

const uploadOnCloudinary = async(filePath) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    try {
        if (!filePath) return null;
        
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto"
        });
        
        // Remove file from local storage after successful upload
        fs.unlinkSync(filePath);
        
        return uploadResult.secure_url;
    } catch (error) {
        // Remove file from local storage even if upload fails
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        console.error("Cloudinary upload error:", error);
        throw error; // Throw error to be handled by calling function
    }
}

export default uploadOnCloudinary;

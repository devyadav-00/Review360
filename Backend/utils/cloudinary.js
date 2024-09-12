import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import dotenv from 'dotenv';
dotenv.config();



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath)
        {
            throw new error("No file path provided");
        }
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        return response.secure_url;
    }
    catch (error) {
        console.error("Error uploading to Cloudinary:", error.message);
        return { error: "Upload failed." };
    }
    finally {
        fs.unlinkSync(localFilePath, (err) => {
            if (err) {
                console.error("Failed to delete local file:", err.message);
            } else {
                console.log("Local file deleted.");
            }
        });
    }
}

export default uploadOnCloudinary;
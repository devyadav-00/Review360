import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { upload } from "../middlewares/multer.js";
import uploadOnCloudinary from "../utils/cloudinary.js";


const employeeRegister = async (req, res) => {
    try {
        const { firstname, lastname, email, password, role, gender, dob, phone, salary, remarks, managed_by } = req.body;
        const existingUser = await User.findOne({ email });
        // console.log("data: ", firstname, lastname, email, password, role, gender, dob, phone, salary, remarks, managed_by, image)

        if (existingUser)
        {
            return res.status(400).json({
                success: false,
                message:"user already exists"
            });
        }
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(error)
        {
            return res.status(500).json({
                success: false,
                message:"error in hashing password"
            });
        }
        let imageUrl = null;
        if (req.file) {
            try {
                const localFilePath = req.file.path;
                imageUrl = await uploadOnCloudinary(localFilePath); // Upload to Cloudinary and get URL
                if (!imageUrl) {
                    throw new Error("Upload failed");
                }
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: "Error uploading image"
                });
            }
        }


        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            role,
            gender,
            dob,
            phone,
            salary,
            remarks,
            managed_by,
            image: imageUrl
        })
        return res.status(200).json({
            success: true,
            message: "User created Successfully"
        });
    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "user cannot be registered ,Please try again later"
        });
    }
}


// employee login

const employeeLogin = async (req, res) => {
    try {
        //data fetch
        const { email, password } = req.body;
        console.log(req.body)
        //validation on email and password
        if (!email || !password)
        {
            return res.status(400).json({
                success: false,
                message:"Please fill all detail carefully"
            });
        }
        //check for registered user
        let user = await User.findOne({ email });
        
        // if not a register user
        if (!user)
        {
            return res.status(400).json({
                success: false,
                message:"User not Register, Register before login"
            });
        }
        const payload = {
            email:user.email,
            _id:user._id,
            role: user.role,
        };
        if (await bcrypt.compare(password, user.password))
        {
            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });
            user = user.toObject();
            user.token = token;
            user.password = undefined;
            // req.user = user

            const options = {
                expires: new Date(Date.now() + 2*60*60*1000), 
                httpOnly: true, 
            };
            res.cookie("token", token, options)
            .status(200)
            .json({
                success: true,
                token,
                user,
                message: 'User Logged in successfully',
            });

        }
        else {
            // password do not match
            return res.status(403).json({
                success: false,
                message:"Incorrect Password"
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message:"login failed"
        });
    }
} 


export {
    employeeRegister,
    employeeLogin
}
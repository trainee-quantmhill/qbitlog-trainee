
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

//components
import { Signup } from "../model/authModel.js";



export const _signUp = async (body) => {
    try {
        const { email, password, confirmPassword } = body;

        // Check if user with the provided email already exists
        const existingUser = await Signup.findOne({ email });

        if (existingUser) {
            
            throw new ErrorHandler('User with this email already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create user
        const user = await Signup.create({ email, password: hashedPassword, confirmPassword: hashedPassword });

        //create token
        const token = await user.createJWT();

        return {
            success:true,
            message:"User Created Sucessfully",
            user:{
                email:user.email,
            },
            token
        }
        
    }
    catch(err){
        
    }
}


export const _login = async(existEmail,userEnteredPassword)=>{
    try {
        // Find the user by email
        const existingUser = await Signup.findOne({ email: existEmail });
        
        if(!existingUser) {
            // User does not exist
            return res.status(404).json({ message: "User does not exist" });
        }
        const passwordMatch = await bcrypt.compare(userEnteredPassword, existingUser.password);
        

        if(!passwordMatch){
            throw new ErrorHandler("Invalid Username or Password" );
        }

        const token = await existingUser.createJWT();

        return {
            success:true,
            message:'Login Successfull',
            user:{
                email:existingUser.email
            },
            token
        }
         
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
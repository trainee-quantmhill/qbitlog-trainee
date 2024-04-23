
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

//components
import { Signup } from "../model/authModel.js";



export const _signUp = async (body) => {
    try {
        const { email, newPassword, confirmPassword } = body;

        // Check if user with the provided email already exists
        const existingUser = await Signup.findOne({ email });

        if (existingUser) {
            
            throw new ErrorHandler('User with this email already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        //create user
        const user = await Signup.create({ email, newPassword: hashedPassword, confirmPassword: hashedPassword });

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


export const _login = async (existEmail, userEnteredPassword) => {
    try {
        // Find the user by email
        const existingUser = await Signup.findOne({ email: existEmail });
        console.log(existingUser);

        if (!existingUser) {
            // User does not exist
            throw new ErrorHandler("User does not exist", 404);
        }
        
        const passwordMatch = await bcrypt.compare(userEnteredPassword, existingUser.newPassword);
        console.log("passmathc",passwordMatch);
        
        if (!passwordMatch) {
            throw new ErrorHandler("Invalid Username or Password", 401);
        }

        const token = await existingUser.createJWT();

        return {
            success: true,
            message: 'Login Successful',
            user: {
                email: existingUser.email
            },
            token
        };
    } catch (error) {
        console.error(error);
        throw new ErrorHandler('Internal Server Error', 500);
    }
};
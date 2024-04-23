
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

//components
import { Signup } from "../model/authModel.js";
import ErrorHandler from '../utils/errorHandler.js';


export const _signUp = async (body) => {
    try {
        const { email, newPassword, confirmPassword } = body;

        // Check if user with the provided email already exists
        const existingUser = await Signup.findOne({ email });
        console.log("existUser ",existingUser);
        if (existingUser) {          
            throw new ErrorHandler('User with this email already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        console.log("Hashed Password:", hashedPassword);

        // Create user
        const user = await Signup.create({ email, newPassword: hashedPassword, confirmPassword: hashedPassword });
        
        console.log("User Created:", user);

        // Create token
        const token = await user.createJWT();

        return {
            success: true,
            message: "User Created Successfully",
            user: {
                email: user.email,
            },
            token
        };
    } catch (err) {
        console.error(err);
        throw new ErrorHandler('Internal Server Error', 500);
    }
};



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
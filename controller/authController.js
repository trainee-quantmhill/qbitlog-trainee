import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import  {Signup } from '../model/authModel.js';

//components

import { _signUp ,_login} from '../service/authService.js';

//signup
export const signUp = async (req, res) => {
    try {
        const result = await _signUp(req.body)
        res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({message:"An error occurred while processing the request"});
    }
};


//login
export const login = async (req, res) => {
   try{
    const existEmail = req.body.email;
    const userEnteredPassword = req.body.password;
    const result = await _login(existEmail,userEnteredPassword);
    res.status(200).json(result);
   }catch(err){
    return res.status(500).json({message:"An error occurred while processing the request"});
   }
    
};

let generatedOtp;
let userEmail;
let isTrue;
let otpTimestamp;
let otpExpirationTime = 2 * 60 * 1000;

// send email
export const sendMail = async (req, res) => {
    try {
        const user = await Signup.findOne({ email: req.body.email });
        if (!user)
            res.status(404).json({ message: 'User does not Exist with this email' });


        const toEmail = user.email;
        userEmail = toEmail;

        //Generate Otp
        const otp = Math.floor(1000 + Math.random() * 9000);
        generatedOtp = otp;
        otpTimestamp = Date.now();//generated time of otp

        let mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "us85370@gmail.com",
                pass: "dhqq uoet oqtb xrxm"
            }
        })

        let details = {
            from: "us85370@gmail.com",
            to: toEmail,
            subject: "Email verification",
            text: `your OTP is ${otp} and it will be valid for 2 minutes`,
        }
        mailTransporter.sendMail(details, (err) => {
            if (err) {
                console.log("It has an error", err);
            }
            else {
                res.status(200).json({ message: "Email send sucessfully and OTP will be valid for 2 minutes" })

            }
        })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}


//verify email
export const verifyEmail = async (req, res) => {
    try {
        const enteredOtp = req.body.otp;

        console.log("Type of entered ",typeof enteredOtp);

        console.log("Type of entered ",typeof generatedOtp);


        console.log("enteredOtp",enteredOtp);
        console.log("generatedOtp",generatedOtp);
        if (Date.now() - otpTimestamp > otpExpirationTime) {
            console.log("OTP expired");
            return res.status(401).json({ message: "OTP expired" });
        }

        if (enteredOtp == generatedOtp) {
            isTrue = true;
            res.status(200).json({ message: "Verification successful" });
        } else {
            console.log("Verification failed");
            res.status(401).json({ message: "Invalid OTP" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


//change password 
export const changePassword = async (req, res) => {

    try {
        if (isTrue === true) {
            const userObject = await Signup.findOne({ email: userEmail });
            
            const { password, confirmPassword } = req.body;
             
            if (password !== confirmPassword) {
                return res.status(400).json({ message: 'Passwords do not match' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            userObject.password = hashedPassword;
            userObject.confirmPassword = hashedPassword;

             
            await userObject.save();
            res.status(200).json({ message: 'Password updated successfully' })
             
            isTrue = false;
        } else {
            res.status(500).json({ message: 'your Email is not verified.Verify your Email' });
        }
    } catch (error) {
         
        res.status(500).json({ message: error.message })
    }

}


// Logout 
export const  logOut = async(req,res)=>{
    try{
        userId = req.user.userId;
        const existUser = await Signup.findById(userId);
        if(!existUser){
            res.status(401).json("User NOt Found With  This ID");
        }
        existUser.toke
    }catch(err){

    }
}




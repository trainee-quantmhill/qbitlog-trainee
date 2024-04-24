import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { Signup } from '../model/authModel.js';

//components

import { _signUp, _login } from '../service/authService.js';
import ErrorHandler from '../utils/errorHandler.js';

//signup
export const signUp = async (req, res) => {
    try {
        console.log(req.body)
        const userEnteredPassword = req.body.password;
        console.log("entered Password", userEnteredPassword);

        const result = await _signUp(req.body)
        res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: "An error occurred while processing the request" });
    }
};


//login
export const login = async (req, res) => {
    try {
         
        const existEmail = req.body.email;
        const userEnteredPassword = req.body.password;
        
        console.log("entered Password", userEnteredPassword);
        const result = await _login(existEmail, userEnteredPassword);
        res.status(200).json(result);
    } catch (err) {
        console.error(err.message);
            res.status(err.status || 500).json({ error: err.message || "Server Error" });
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
        const enteredOtp = parseInt(req.body.otp);

        console.log("Type of entered ", typeof enteredOtp);

        console.log("Type of entered ", typeof generatedOtp);


        console.log("enteredOtp", enteredOtp);
        console.log("generatedOtp", generatedOtp);
        if (Date.now() - otpTimestamp > otpExpirationTime) {
            console.log("OTP expired");
            return res.status(401).json({ message: "OTP expired" });
        }

        if (enteredOtp === generatedOtp) {
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

            if (!userObject) {
                res.status(401).json("User does not exist with this email id ")
            }
            console.log("Body", req.body);
            console.log("userObject", userObject)
            const { newPassword, confirmPassword } = req.body;

            console.log("password", newPassword);
            console.log("confirmPassword", confirmPassword);

            if (newPassword != confirmPassword) {
                return res.status(400).json({ message: 'Passwords do not match' });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            console.log("hashedPassword", hashedPassword);
            userObject.password = hashedPassword
            userObject.newPassword = hashedPassword;
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


//updatePassword
export const updatePassword = async (req, res) => {
    try {
        const userId = req.user.userId;
        const userObject = await Signup.findById(userId);

        if (!userObject) {
            return res.status(401).json("User does not exist with this id");
        }

        const { password, newPassword, confirmPassword } = req.body;

        const passwordMatch = await bcrypt.compare(password, userObject.password);

        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid current Password" });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update only the password field
        userObject.password = hashedPassword;

        await userObject.save();
        res.status(200).json({ message: 'Password updated successfully' });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Logout 
export const logOut = async (req, res) => {
    try {
        userId = req.user.userId;
        const existUser = await Signup.findById(userId);
        if (!existUser) {
            res.status(401).json("User NOt Found With  This ID");
        }
         
    } catch (err) {

    }
}




import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';


//comsponents
import { Signup } from "../model/authModel.js";

//signup
export const signUp = async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    try {
        // Check if user with the provided email already exists
        const existingUser = await Signup.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ error: 'User with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create user
        const user = await Signup.create({ email, password: hashedPassword, confirmPassword: hashedPassword });

        //create token
        const token = await user.createJWT();

        res.status(201).send({
            success:true,
            message:"User Created Sucessfully",
            user:{
                email:user.email,
            },
            token
        })

        // res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


//login
export const login = async (req, res) => {
    const existEmail = req.body.email;
    const userEnteredPassword = req.body.password;

    try {
        // Find the user by email
        const existingUser = await Signup.findOne({ email: existEmail });
        
        if (!existingUser) {
            // User does not exist
            return res.status(404).json({ message: "User does not exist" });
        }

        const passwordMatch = await bcrypt.compare(userEnteredPassword, existingUser.password);

        if(!passwordMatch){
            return res.status(401).json({error:"Invalid Username or Password"});
        }

        const token = await existingUser.createJWT();

        res.status(200).json({
            success:true,
            message:'Login Successfull',
            user:{
                email:existingUser.email
            },
            token
        })
        // if (passwordMatch) {
        //     // Passwords match, login successful
        //     return res.status(200).json({ message: 'Login successful' });
        // } else {
        //     // Invalid password
        //     return res.status(401).json({ error: 'Invalid password' });
        // }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
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
            console.log(userObject);
            const { password, confirmPassword } = req.body;
            console.log(password);
            console.log(confirmPassword);
            if (password !== confirmPassword) {
                return res.status(400).json({ message: 'Passwords do not match' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            userObject.password = hashedPassword;
            userObject.confirmPassword = hashedPassword;

            console.log(password);
            await userObject.save();
            res.status(200).json({ message: 'Password updated successfully' })
            console.log('Password updated successfully');
            isTrue = false;
        } else {
            res.status(500).json({ message: 'your Email is not verified.Verify your Email' });
        }
    } catch (error) {
        console.error('Error updating password:', error.message);
        res.status(500).json({ message: error.message })
    }

}




import express from 'express';


const router = express.Router();


//components
import userAuth from '../middleware/userAuth.js'; //Middleware
import { signUp ,login,sendMail,verifyEmail,changePassword,logOut} from '../controller/authController.js';

router.post('/signup',signUp);

router.post('/login',login);

router.post('/get-otp',sendMail);

router.post('/confirm-otp',verifyEmail);

router.patch('/change-password', changePassword);

router.get('/logout',userAuth,logOut);


    


export default router;
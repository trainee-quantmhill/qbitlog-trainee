
import express from 'express';


const router = express.Router();


//components
import { signUp ,login,sendMail,verifyEmail,changePassword} from '../controller/authController.js';

router.post('/signup',signUp);
router.post('/login',login);
router.post('/get-otp',sendMail);
router.post('/confirm-otp',verifyEmail);
router.patch('/change-password',changePassword);


    


export default router;
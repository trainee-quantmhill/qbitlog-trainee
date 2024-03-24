import express from 'express';

//components
import userAuth from '../middleware/userAuth.js'; //Middleware
import { addLog } from '../controller/userController.js';



const router = express.Router();

//apis
router.post('/add-log',userAuth,addLog);



export default router;
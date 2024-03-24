import express from 'express';

//components
import userAuth from '../middleware/userAuth.js'; //Middleware
import { addLog , updateLog ,deleteLog} from '../controller/userController.js';



const router = express.Router();

//apis

//Add Log
router.post('/add-log',userAuth,addLog);

//update Log
router.patch('/update-log/:id',userAuth,updateLog);
router.delete('/delete-log/:id',userAuth,deleteLog);



export default router;
import express from 'express';

//components
import userAuth from '../middleware/userAuth.js'; //Middleware
import { addLog , updateLog ,deleteLog,fetchLog} from '../controller/userController.js';



const router = express.Router();

//apis

//Add Log
router.post('/add-log',userAuth,addLog);

//update Log
router.patch('/update-log/:id',userAuth,updateLog);

//delete Log
router.delete('/delete-log/:id',userAuth,deleteLog);

//fetch logs
router.get('/fetch-log',fetchLog);



export default router;
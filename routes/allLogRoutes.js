

import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { submitLog ,allLogs } from '../controller/allLogController.js';



const router = express.Router();

//submit Log
router.post('/submit-log',userAuth,submitLog);

router.get('/search-logs',userAuth,allLogs);

export default router;

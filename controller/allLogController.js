
import { _submitLog,_allLogs } from "../service/allLogService.js";


//===================Submit Log Controller==============
export const submitLog = async(req,res)=>{
    try{
        const result = await _submitLog();       
        res.status(200).json({message:'Logs added successfully'});
    }catch(err){
        res.status(err.status || 500).json({ message: err.message || "Server Error" });
    }
}



//====================Filter All Logs ==================
 
export const allLogs = async(req,res)=>{
    try{
         
        const result = await _allLogs(req.query,req.user);
        res.status(200).json(result);
    }catch(err){
        res.status(err.status || 500).json({ message: err.message || "Server Error" });
    }
}


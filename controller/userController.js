
import logsSchema from '../model/userModel.js';

export const addLog = async(req,res)=>{
    const {logDate,logHour,logMin,logType,projectName,logDescription} = req.body;
    
    //validation
    if(!logDate || !logHour || !logMin || !logType || !projectName || !logDescription){
        return res.status(400).json({message:'All  Fields Are required'});
    }

    console.log("USerEmail:",req.user.userEmail);
    req.body.createdBy = req.user.userEmail;
    const log = await logsSchema.create(req.body);

    res.status(201).json(log);
}
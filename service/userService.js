import ErrorHandler from "../utils/errorHandler.js";
import currentLogsModel from '../model/userModel.js';

// ===========Add Log=================
export const _addLog = async (body, userId) => {
    try {
        console.log("body:", body);

        const { logDate } = body;

        // Find year and month
        const arr = logDate.split('-');
        const logYear = arr[2];   
        const logMonth = arr[1];  

        console.log("logYear:", logYear);
        console.log("logMonth:", logMonth);

        // Create a new object with additional properties
        const newBody = {
            ...body,
            logYear: logYear,
            logMonth: logMonth,
            createdBy: userId
        };

        console.log("userId:", userId);

        console.log(newBody);
        
        // Create log entry in the database
        const log = await currentLogsModel.create(newBody);
      
        return log;
    } catch (err) {
        console.log("Catch error:", err);
        return { status: err.status || 500, message: err.message || "Internal Server Error" };
    }
}





// ==================Update Log ==================
export const _updateLog = async (id, body, userId) => {
    try {
        const { logDate, logHour, logMin, logType, projectName, logDescription } = body;

        //find year
        let arr;
        arr =logDate.split('-');
        let logYear = arr[2];
        let logMonth =arr[1];

        
          // Add logYear and logMonth properties to the body object
          body.logYear = logYear;
          body.logMonth = logMonth;
  
          console.log("logYear:", logYear);
          console.log("logMonth:", logMonth);

        //validation
        if (!logDate || !logYear || !logMonth || !logHour || !logMin || !logType || !projectName || !logDescription) {
            throw new ErrorHandler('All  Fields Are required');
        }

        const log = await currentLogsModel.findOne({ _id: id })

        //validation
        if (userId !== log.createdBy.toString()) {
            throw new ErrorHandler("You are not authorized to Update this Job");
        }

        if (!log) {
            throw new ErrorHandler( "No Logs Found with this Id" );
        }

        const updateLog = await currentLogsModel.findOneAndUpdate({ _id: id }, body, { new: true, runValidators: true });
        return updateLog;
    } catch (err) {
        return { status: err.status || 500, message: err.message || "Internal Server Error " }
    }
}


//===================Delete Log ==============

export const _deleteLog = async (id,userId) => {
    try {
        const log = await currentLogsModel.findOne({ _id: id });

        //validation
        if (!log) {
            throw new ErrorHandler('log not found with this id' );
        }

        //validation
        if (userId !== log.createdBy.toString()) {
            throw new ErrorHandler( "You are not authorized to Update this Job" );
        }

        await log.deleteOne();
        return { message: 'Log Deleted Sucessfully' };
    } catch (err) {
        return { status: err.status || 500, message: err.message || "Internal Server Error " }
    }
}

//
export const _fetchLog = async()=>{
    try{
        const logs=await currentLogsModel.find();
        if(!logs){
            throw new ErrorHandler("NO logs found ");
        }
        return logs;
    }catch(err){
        return { status: err.status || 500, message: err.message || "Internal Server Error " }
    }
}
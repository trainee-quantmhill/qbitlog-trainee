import ErrorHandler from "../utils/errorHandler.js";
import currentLogsModel from '../model/userModel.js';

// ===========Add Log=================
export const _addLog = async (body, userId) => {
    try {
        console.log("body:", body);

        const { logHour, logDate, logDescription, logType, logMin, projectName } = body;

        // Find year and month
        const arr = logDate.split('-');
        const logYear = arr[2];   
        const logMonth = arr[1];  

        // Add logYear and logMonth properties to the body object
        body.logYear = logYear;
        body.logMonth = logMonth;

        console.log("logYear:", logYear);
        console.log("logMonth:", logMonth);

        // Validation
        if (!logDate || !logHour || !logYear || !logMin || !logType || !projectName || !logDescription) {
            throw new ErrorHandler('All Fields Are Required');
        }

        // Add createdBy field to the body
        body.createdBy = userId;
        console.log("userId:", userId);

        console.log(body);
        // Create log entry in the database
        const log = await currentLogsModel.create(body);

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
        logYear = arr[2];
        logMonth =arr[1];

        
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
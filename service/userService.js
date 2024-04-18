import ErrorHandler from "../utils/errorHandler.js";
import currentLogsModel from '../model/userModel.js';

// ===========Add Log=================
export const _addLog = async (body, userId) => {
    try {
        console.log("body:", body);
        const { logDate,logYear,logMonth, logHour, logMin, logType, projectName, logDescription } = body;

        //find year
        let arr;
        arr =logDate.split('-');
        logYear = arr[2];
        logMonth =arr[1];
        
        //validation
        if (!logDate ||  !logHour  || !logYear || !logMin || !logType || !projectName || !logDescription) {
            throw new ErrorHandler('All Fields Are Required');
        }
        
        body.createdBy = userId;
        const log = await currentLogsModel.create(body);

        return log;
    } catch (err) {
        return { status: err.status || 500, message: err.message || "Internal Server Error " }
    }
}


// ==================Update Log ==================
export const _updateLog = async (id, body, userId) => {
    try {
        const { logDate,logYear,logMonth, logHour, logMin, logType, projectName, logDescription } = body;

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
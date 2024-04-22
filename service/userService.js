import ErrorHandler from "../utils/errorHandler.js";
import currentLogsModel from '../model/userModel.js';
import { parse, getISOWeek } from 'date-fns'; // Import necessary functions from date-fns

// ===========Add Log=================
export const _addLog = async (body, userId) => {
    try {
        const { logDate } = body;

         
        // Find year and month
        const arr = logDate.split('-');

        //find Year 
        const logYear = arr[0];
        
        //Find Month
        const month = { 1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June", 7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December" };
        const logMonth = month[parseInt(arr[1])];

        //Find date 
        const date  = arr[2];

        console.log("Date",date);
        let week = getWeekFromDate(logMonth, date);
        console.log("Week:", week);

        const finalWeek = `Week ${week}`;
        console.log(finalWeek);
        
        
        // Create a new object with additional properties
        const newBody = {
            ...body,
            logYear: logYear,
            logMonth: logMonth,
            logWeek: finalWeek,
            createdBy: userId
        };

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
        const { logDate, logType, project, hours, minutes, logDescription } = body;

         // Find year and month
         const arr = logDate.split('-');
        const logYear= arr[0];
        const logMonth= arr[1];

        // Convert logMonth to the full month name
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        const fullMonthName = monthNames[parseInt(logMonth) - 1]; // Subtract 1 to match array index

        let week = getWeekFromDate(fullMonthName, arr[2]);
        const finalWeek = `Week ${week}`;
        console.log(week);
        // Add logYear and fullMonthName properties to the body object
        body.logYear = logYear;
        body.logMonth = fullMonthName;
        body.logWeek = finalWeek;

        // Validate required fields
        if (!logDate || !hours || !minutes || !logType || !project || !logDescription) {
            throw new ErrorHandler('All fields are required');
        }

        // Find the log by ID
        const log = await currentLogsModel.findById(id);


        console.log(log);
        // Check if the log exists
        if (!log) {
            throw new ErrorHandler('No logs found with this ID');
        }

        // Check if the user is authorized to update the log
        if (userId !== log.createdBy?.toString()) {
            throw new ErrorHandler('You are not authorized to update this log');
        }

        // Update the log
        const updateLog = await currentLogsModel.findOneAndUpdate({ _id: id }, body, { new: true, runValidators: true });
        return updateLog;
    } catch (err) {
        console.error(err); // Log the error for debugging
        return { status: err.status || 500, message: err.message || 'Internal Server Error' };
    }
};



//===================Delete Log ==============

export const _deleteLog = async (id, userId) => {
    try {
        const log = await currentLogsModel.findOne({ _id: id });


        //validation
        if (!log) {
            throw new ErrorHandler('log not found with this id');
        }

        //validation
        if (userId !== log.createdBy.toString()) {
            throw new ErrorHandler("You are not authorized to delete this Job");
        }

        await log.deleteOne();
        return { message: 'Log Deleted Sucessfully' };
    } catch (err) {
        return { status: err.status || 500, message: err.message || "Internal Server Error " }
    }
}


export const _fetchLog = async (createdBYId) => {
    try {
        const logs = await currentLogsModel.find({ createdBy: createdBYId });
        if (!logs || logs.length === 0) {
            throw new ErrorHandler("No logs found for the specified user");
        }
        return logs;
    } catch (err) {
        return { status: err.status || 500, message: err.message || "Internal Server Error" };
    }
}


function getWeekFromDate(monthName, dayOfMonth) {
    // Parse the month name to get the month number (0-based index)
    const month = parse(monthName, 'MMMM', new Date());

    // Create a new Date object with the specified month and day
    const date = new Date(new Date().getFullYear(), month.getMonth(), dayOfMonth);

    // Get the week of the year
    const weekNumber = getISOWeek(date);

    // Check if the week number is within the range of 1 to 8
    if (weekNumber >= 1 && weekNumber <= 8) {
        return weekNumber;
    } else {
        // If the week number is outside the range, calculate the week number based on the first day of the month
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const firstWeekNumber = getISOWeek(firstDayOfMonth);
        const weekNumberInMonth = weekNumber - firstWeekNumber + 1;

        // Return the calculated week number within the range of 1 to 8
        return weekNumberInMonth >= 1 && weekNumberInMonth <= 8 ? weekNumberInMonth : null;
    }
}

import currentLogsModel from "../model/userModel.js";
import allLogsModel from "../model/allLogModel.js";
import { parse, getISOWeek } from 'date-fns'; // Import necessary functions from date-fns


//===================Submit  all Logs==============
export const _submitLog = async () => {
    try {
        const allLogs = await currentLogsModel.find();


        // Save fetched documents into the target collection
        await allLogsModel.insertMany(allLogs);

        // Delete all documents from the source collection
        await currentLogsModel.deleteMany({});

        return { message: "Logs added sucessfully" };
    } catch (err) {
        return { status: err.status || 500, message: err.message || "Internal server error " };
    }
}



//===================filter   all Logs==============
export const _allLogs = async (query, user) => {
    try {
        const { logYear, logMonth, logWeek, logDate } = query;

        console.log("logyear", logYear);
        // Conditions for searching filters
        const queryObject = { createdBy: user.userId };

        let logWeekInNumber = null;
        // if (logWeek) {
        //     const logWeekValue = logWeek.split(':')[1];
        //     if (logWeekValue) {
        //         const trimmedLogWeekValue = logWeekValue.trim();
        //         if (!isNaN(trimmedLogWeekValue) && trimmedLogWeekValue !== "all") {
        //             logWeekInNumber = parseInt(trimmedLogWeekValue, 10);
        //             console.log("logWeekInNumber", logWeekInNumber);
        //         }
        //     }
        // }

       
        // Logic filter
        if (logYear && logYear !== "all") {
            queryObject.logYear = logYear;
        }
        if (logMonth && logMonth !== "all") {
            queryObject.logMonth = logMonth;
        }

        // Check if logWeekInNumber is a valid number
        if (logWeek !== null) {
            queryObject.logWeek = logWeek;
        }

        if (logDate && logDate !== "all") {
            queryObject.logDate = logDate;
        }

        let queryResult = allLogsModel.find(queryObject);

        // Count logs
        const totalLogs = await allLogsModel.countDocuments(queryResult);

        const logs = await queryResult;

        return {
            logs
        }
    } catch (err) {
        return { status: err.status || 500, message: err.message || "Internal server error " };
    }
}





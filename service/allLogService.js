
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
        const { year, month, week, date } = query;

         
        //conditions for searching filters
        const queryObject = { createdBy: user.userId };


        //logic filter
        if (year && year !== "all") {
            queryObject.year = year;
        }
        if (month && month !== "all") {
            queryObject.month = month;
        }
        

        if (week && week !== "all") {
            queryObject.week = week;            
        }
        if (date && date !== "all") {
            queryObject.logDate = date;            
        }

        let queryResult = allLogsModel.find(queryObject);

        //count log
        const totalLogs = await allLogsModel.countDocuments(queryResult);

        const logs = await queryResult;

        return {
            logs
        }
    } catch (err) {
        return { status: err.status || 500, message: err.message || "Internal server error " };
    }
}

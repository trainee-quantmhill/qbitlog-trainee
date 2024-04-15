
import currentLogsModel from "../model/userModel.js";
import allLogsModel from "../model/allLogModel.js";


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
export const _allLogs = async (query,user) => {
    try {
        const { logYear,logMonth,logWeek,logDate} =  query;

        //conditions for searching filters
        const queryObject = { createdBy:  user.userId };
         

        //logic filter
        if (logYear && logYear !== "all") {
            queryObject.logYear = logYear;            
        }
        if (logMonth && logMonth !== "all") {
            queryObject.logMonth = logMonth;            
        }
        if (logWeek && logWeek !== "all") {
            queryObject.logWeek = logWeek;            
        }
        if (logDate && logDate !== "all") {
            queryObject.logDate = logDate;            
        }

        let queryResult = allLogsModel.find(queryObject);

        //count log
        const totalLogs = await allLogsModel.countDocuments(queryResult);

        const logs = await queryResult;

        return {
            totalLogs,
            logs,
        }
    } catch (err) {
        return { status: err.status || 500, message: err.message || "Internal server error " };
    }
}
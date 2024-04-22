
import currentLogsModel from "../model/userModel.js";
import allLogsModel from "../model/allLogModel.js";
import { parse, getISOWeek } from 'date-fns'; // Import necessary functions from date-fns


//===================Submit  all Logs==============
export const _submitLog = async () => {
    try {
        const allLogs = await currentLogsModel.find();

        console.log("allLogs",allLogs);
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

        console.log(logYear)
        //conditions for searching filters
        const queryObject = { createdBy: user.userId };


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

            logs
        }
    } catch (err) {
        return { status: err.status || 500, message: err.message || "Internal server error " };
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
    if (weekNumber >= 1 && weekNumber <= 6) {
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
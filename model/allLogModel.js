import mongoose from "mongoose";

const allLogsSchema = new mongoose.Schema({
    logDate : {
        type:String,
    },
    logYear:{
        type:String,
    },
    logMonth:{
        type:String,
    },
    logHour: {
        type:String,
    },
    logWeek:{
        type:String,
    },
    logMin:{
        type:String,
    },
    logType:{
        type:String,
    },
    projectName:{
        type:String,
    },
    logDescription:{
        type:String,
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"usersignups",
    },
})


const allLogsModel = mongoose.model('allLogsModel',allLogsSchema);

export default allLogsModel;
import mongoose from "mongoose";

const logsSchema = new mongoose.Schema({
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


const currentLogsModel = mongoose.model('currentLogsModel',logsSchema);

export default currentLogsModel;
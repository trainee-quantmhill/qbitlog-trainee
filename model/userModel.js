import mongoose from "mongoose";

const logsSchema = new mongoose.Schema({
    logDate : {
        type:String,
    },
    logType:{
        type:String,
    },
    projectName:{
        type:String,
    },
    logHour: {
        type:String,
    },  
    logMin:{
        type:String,
    },  
    logDescription:{
        type:String,
    },
    logYear:{
        type:String,
    },
    logMonth:{
        type:String,
    },
    logWeek:{
        type:String,
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"usersignups",
    },
})


const currentLogsModel = mongoose.model('currentLogsModel',logsSchema);

export default currentLogsModel;
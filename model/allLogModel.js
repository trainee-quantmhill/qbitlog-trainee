import mongoose from "mongoose";

const logsSchema = new mongoose.Schema({
    logDate : {
        type:String,
    },
    logType:{
        type:String,
    },
    project:{
        type:String,
    },
    hours: {
        type:String,
    },  
    minutes:{
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


const currentLogsModel = mongoose.model('allLogsModel',logsSchema);

export default currentLogsModel;
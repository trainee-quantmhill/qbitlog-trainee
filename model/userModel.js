import mongoose from "mongoose";

const logsSchema = new mongoose.Schema({
    logDate : {
        type:String,
    },
    logHour: {
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
        type:String,
        ref:"userSignup",

    }
})


const currentLogs = mongoose.model('currentLogs',logsSchema);

export default currentLogs;
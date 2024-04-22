import mongoose from "mongoose";

const allLogsSchema = new mongoose.Schema({
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
    year:{
        type:String,
    },
    month:{
        type:String,
    },
    week:{
        type:String,
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"usersignups",
    },
})


const allLogsModel = mongoose.model('allLogsModel',allLogsSchema);

export default allLogsModel;
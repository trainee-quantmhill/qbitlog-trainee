
import currentLogsModel from '../model/userModel.js';
import mongoose from 'mongoose';
export const addLog = async (req, res) => {
    try {
        const { logDate, logHour, logMin, logType, projectName, logDescription } = req.body;

        //validation
        if (!logDate || !logHour || !logMin || !logType || !projectName || !logDescription) {
            return res.status(400).json({ message: 'All  Fields Are required' });
        }

        console.log("userId:", req.user.userId);
        req.body.createdBy = req.user.userId;
        const log = await currentLogsModel.create(req.body);

        res.status(201).json(log);
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}


export const updateLog = async (req, res) => {
    try {
        const { id } = req.params;

        // console.log(id);
        const { logDate, logHour, logMin, logType, projectName, logDescription } = req.body;

        //validation
        if (!logDate || !logHour || !logMin || !logType || !projectName || !logDescription) {
            return res.status(400).json({ message: 'All  Fields Are required' });
        }


        console.log("hello");
        const log = await currentLogsModel.findOne({ _id: id })

        console.log(log);

        console.log("log.", log.createdBy.toString())

        //validation
        if (req.user.userId !== log.createdBy.toString()) {
            return res.status(401).json({ message: "You are not authorized to Update this Job" })
        }

        if (!log) {
            return res.status(401).json({ message: "No Logs Found with this Id" });
        }

        console.log("log.createdBy", log.createdBy);
        console.log("logsSchema.createdBy", currentLogsModel.createdBy);


        const updateLog = await currentLogsModel.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidators: true });

        res.status(200).json(updateLog);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export const deleteLog = async (req, res) => {
    try {
        const { id } = req.params;

        const log = await currentLogsModel.findOne({ _id: id });

        //validation
        if (!log) {
            return res.status(404).json({ message: 'log not found with this id' });
        }

        //validation
        if (req.user.userId !== log.createdBy.toString()) {
            return res.status(401).json({ message: "You are not authorized to Update this Job" })
        }

        await log.deleteOne();
        res.status(200).json({ message: 'Log Deleted Sucessfully' });
    } catch (err) {
        return res.status(500).json({message:err.message  ||  "Internal Server Error "});
    }
}
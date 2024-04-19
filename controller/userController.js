
import { _addLog , _updateLog} from '../service/userService.js';

// ===========Add Log=================
export const addLog = async (req, res) => {
    try {
        console.log(req.body);
        const log = await _addLog(req.body, req.user.userId);
        
        res.status(200).json(log);
    } catch (err) {
        console.log("catch error in controlller ");
        return res.status(500).json({message:"An error occurred while processing the request"});
    }
}



// ==================Update Log ==================
export const updateLog = async (req, res) => {
    try {
        const {id}= req.params;
        const log = await _updateLog(id,req.body,req.user.userId);
        res.status(200).json(log);        
    } catch (err) {
        return res.status(500).json({message:"An error occurred while processing the request"})
    }
}



//===================Delete Log ==============
export const deleteLog = async (req, res) => {
    try {
        const {id}= req.params;
        const log = await _deleteLog(id,req.user.userId);
        res.status(200).json({message:"Log Deleted Sucessfully"})        
    } catch (err) {
        return res.status(500).json({message:"An error occurred while processing the request"})
    }
}
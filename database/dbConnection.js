import mongoose from 'mongoose';

const Connection = async () => {
    const URL = 'mongodb+srv://udaysingh:hZi68bGMf9LmZ7SG@cluster0.wvpotiy.mongodb.net/qbitLogDatabase';
    try {
        await mongoose.connect(URL)
        console.log('Database connected successfully');
    } catch (error) {
        if (error instanceof mongoose.Error.ServerSelectionError) {
            console.error('Server Selection Error:', error);
        } else if (error instanceof mongoose.Error.MongoNetworkError) {
            console.error('MongoNetworkError:', error);
        }
    }
};

export default Connection;
import mongoose from 'mongoose';

const Connection = async () => {
    const URL = 'mongodb+srv://udaysingh:hZi68bGMf9LmZ7SG@cluster0.wvpotiy.mongodb.net/qbitLogDatabase';
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected To Mongo Database ${mongoose.connection.host}` );
    }catch(error){
        console.log(`MongoDB Error ${error} `)
    }
};

export default Connection;
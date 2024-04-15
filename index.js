import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';


//components
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import Connection from './database/dbConnection.js';
import allLogRoutes from './routes/allLogRoutes.js';

//config dotenv
dotenv.config();

//rest object
const app = express();

// It is use to run of frontend and backend on same server
app.use(cors());

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/api', authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/user',allLogRoutes);


const PORT = process.env.PORT || 8000;

Connection();
app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
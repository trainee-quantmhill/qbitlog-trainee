import express from 'express';
import bodyParser from 'body-parser';
import cors  from 'cors';


//components
import  signUp  from './routes/auth.js';
import  login  from './routes/auth.js';
import sendOtp from './routes/auth.js';
import Connection from './database/dbConnection.js';


const app = express();
app.use(cors());

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/', signUp);
app.use('/', login);
app.use('/', sendOtp);

const PORT = 8000;

Connection();
app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
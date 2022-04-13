import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import mongoose from 'mongoose';
const app = express();
app.set('trust proxy',true);
app.use(json());
app.use(cookieSession({
    signed:false,
    secure:true
    })
);

const start = async ()=>{
    if(!process.env.MongoDB_URI){
        throw new Error('No MONGO_URI');
    }

    try {
        await mongoose.connect(process.env.MongoDB_URI);
        console.log("Connected To MongoDB");
    } catch (error) {
        console.error(error);
    }

    app.listen(3000,()=>{
        console.log("Listening on 3000!!!!!!");
    });
}

start();

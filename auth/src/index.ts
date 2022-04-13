import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler, NotFoundError } from '@johnny711/common';
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

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*',async ()=>{
    throw new NotFoundError();
});

app.use(errorHandler);

const start = async ()=>{
    if(!process.env.JWT_KEY){
        throw new Error('No JWT Key Found')
    }

    try {
        await mongoose.connect('mongodb://auth-mongo-service:27017/auth');
        console.log("Connected To MongoDB");
    } catch (error) {
        console.error(error);
    }

    app.listen(3000,()=>{
        console.log("Listening on 3000!!!!!!");
    });
}

start();

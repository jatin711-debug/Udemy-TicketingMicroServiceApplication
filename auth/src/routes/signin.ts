import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest, BadRequestError } from '@johnny711/common';
import { User } from '../Models/user';
import { Password } from '../utils/hash-passwords';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signin', 
    [
        body('email')
            .isEmail()
                .withMessage("email Must Be valid"),
        body('password')
        .trim()
            .notEmpty()
                .withMessage('Password must be supplied')
    ],
    validateRequest,
    async (req:Request,res:Response) => {
        const { email, password } = req.body;
        const existingUser = await User.findOne({email});
        if(!existingUser){
            throw new BadRequestError('Invalid Email');
        }
        const passwordMatch = await Password.compare(existingUser.password,password);
        if(!passwordMatch){
            throw new BadRequestError('Invalid Password');
        }
        const userJwt = await jwt.sign({
            id:existingUser.id,
            email:existingUser.email
        },process.env.JWT_KEY!);
    
        req.session = {
            jwt:userJwt,
        }
        res.status(200).send(existingUser);
});

export {router as signinRouter};
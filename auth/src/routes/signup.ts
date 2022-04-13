import express, { Request,Response } from 'express';
import { body } from 'express-validator';
import { User } from '../Models/user';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError } from '@johnny711/common';
const router = express.Router();
router.post('/api/users/signup',[
    body('email')
        .isEmail()
            .withMessage('Email must be provided'),
    body('password')
        .trim()
            .isLength({ min:4, max:20 })
                .withMessage('Password must be at least between 4 and 20 characters')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email:email });
    if(existingUser){
        throw new BadRequestError('Email In Use');
    }
    const user = User.build({email, password});
    await user.save();

    const userJwt = await jwt.sign({
        id:user.id,
        email:user.email
    },process.env.JWT_KEY!);

    req.session = {
        jwt:userJwt,
    }
    res.status(200).send(user);
});

export {router as signupRouter};
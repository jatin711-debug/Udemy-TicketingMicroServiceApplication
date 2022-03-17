import express, { Request,Response } from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post('/api/users/signup',[
    body('email')
        .isEmail()
            .withMessage('Email must be provided'),
    body('password')
        .trim()
            .isLength({ min:4, max:20 })
                .withMessage('Password must be at least between 4 and 20 characters')
],(req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new Error("Invalid password or email");
    }

    const { email, password } = req.body;
    console.log(password+ email);
    res.send("Hi There!");
});

export {router as signupRouter};
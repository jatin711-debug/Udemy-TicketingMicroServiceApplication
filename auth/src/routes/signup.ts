import express, { Request,Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../Models/user';
import jwt from 'jsonwebtoken';
import { RequestValidationError} from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const router = express.Router();

router.post('/api/users/signup',[
    body('email')
        .isEmail()
            .withMessage('Email must be provided'),
    body('password')
        .trim()
            .isLength({ min:4, max:20 })
                .withMessage('Password must be at least between 4 and 20 characters')
],async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email:email });
    if(existingUser){
        throw new BadRequestError('Email In Use');
    }
    const user = User.build({email, password});
    await user.save();

    const userJwt = jwt.sign({
        id:user.id,
        email:user.email
    },'opa');

    req.session = {
        jwt:userJwt,
    }
    res.status(200).send(user);
});

export {router as signupRouter};
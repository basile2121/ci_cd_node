import { Request, Response } from 'express';
import {User} from '../models/user.model';
import jwt from 'jsonwebtoken';

export const checkAuth = async(req: Request, res: Response, next: any) => {
    const token = req.cookies.jwt || null;
    const secret = process.env.TOKEN_SECRET;
    if (token && secret) {
        jwt.verify(token, secret, async(err: any, decodedToken: any) => {
            if (err) {
                res.locals.user = null;
                res.cookie('jwt', '', { maxAge: 1 });
                return res.status(403).json({error: 'Bad token'});
            }
            const user = await User.findById(decodedToken.id);
            res.locals.user = user;
            if (!res.locals.user) {
                res.cookie('jwt', '', { maxAge: 1 });
                return res.status(403).json({error: "User doesn't exist"});
            }
            next();
        });
    } else {
        res.locals.user = null;
        return res.status(403).json({error: 'Not authorized'});
    }
};
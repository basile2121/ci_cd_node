import * as authService from '../services/auth.service';
import {Request, Response} from 'express';
import {logger} from '../../config/logger';

export const register = async(req: Request, res: Response) => {
    try {
        const data = await authService.register(req.body as any);
        if (data instanceof Error) {
            logger.error('Controller -> register : Error while register. Schema not validate : ' + data);
            return res.status(400).json({error: data.message});
        }
        logger.info('Controller -> register : Register success');
        return res.status(201).json({data});
    } catch (e) {
        logger.error('Controller -> register : Error while register : ' + e);
        return res.status(400).json({error: e});
    }
};

export const login = async(req: Request, res: Response) => {
    const {email, password} = req.body;
    const maxAge = 3 * 24 * 60 * 60 * 1000;
    const data: any = await authService.login(email, password);
    if (data instanceof Error) {
        logger.error('Controller -> login : Error while login. Schema not validate : ' + data);
        return res.status(400).json({error: data.message});
    }
    const token = authService.createToken(data._id);
    if (token) {
        res.cookie('jwt', token, {httpOnly: true, maxAge});
    }
    logger.info('Controller -> login : Login : ' + email + ' success');
    return res.status(200).json({user: data, token: token});
};

export const logout = async(req: Request, res: Response) => {
    res.cookie('jwt', '', {maxAge: 1});
    logger.info('Controller -> logout : Your are now logged out');
    return res.status(200).json({message: 'Your are now logged out'});
};

export const whoami = async(req: Request, res: Response) => {
    const user = res.locals.user;
    user.password = undefined;
    if (!user) {
        logger.error('Controller -> whoami : No user found');
        return res.status(403).json({error: 'No user found'});
    }
    logger.info('Controller -> whoami : Whoami : ' + user.email + ' success');
    return res.status(200).json({user});
};
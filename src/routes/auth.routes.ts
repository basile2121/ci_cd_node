
import express, { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { checkAuth } from '../middleware/authCheck';


const authRouter: Router = express.Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.get('/whoami', checkAuth, authController.whoami);

module.exports = authRouter;
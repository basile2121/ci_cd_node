//importing modules
import express from 'express';
import { HumanController } from '../controllers/human.controller';
import {checkAuth} from '../middleware/authCheck';

//initiating the router
const humanRouter = express.Router();

//add human route
humanRouter.post('/', checkAuth, HumanController.addHuman);

//get humans
humanRouter.get('/', checkAuth,  HumanController.getHumans);

//High a human
humanRouter.get('/high', checkAuth, HumanController.getHumansWithHighSalaryAndYoungAge);

//High a human
humanRouter.get('/specific', checkAuth, HumanController.getHumansSpecificCriteria);

//get single human
humanRouter.get('/:id', checkAuth, HumanController.getOneHuman);

//update a human
humanRouter.put('/:id', checkAuth, HumanController.updateHuman);

//delete a human
humanRouter.delete('/:id', checkAuth, HumanController.deleteHuman);

module.exports = humanRouter;
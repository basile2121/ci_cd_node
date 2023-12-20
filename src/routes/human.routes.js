"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//importing modules
const express_1 = __importDefault(require("express"));
const human_controller_1 = require("../controllers/human.controller");
const authCheck_1 = require("../middleware/authCheck");
//initiating the router
const humanRouter = express_1.default.Router();
//add human route
humanRouter.post('/', authCheck_1.checkAuth, human_controller_1.HumanController.addHuman);
//get humans
humanRouter.get('/', authCheck_1.checkAuth, human_controller_1.HumanController.getHumans);
//High a human
humanRouter.get('/high', authCheck_1.checkAuth, human_controller_1.HumanController.getHumansWithHighSalaryAndYoungAge);
//High a human
humanRouter.get('/specific', authCheck_1.checkAuth, human_controller_1.HumanController.getHumansSpecificCriteria);
//get single human
humanRouter.get('/:id', authCheck_1.checkAuth, human_controller_1.HumanController.getOneHuman);
//update a human
humanRouter.put('/:id', authCheck_1.checkAuth, human_controller_1.HumanController.updateHuman);
//delete a human
humanRouter.delete('/:id', authCheck_1.checkAuth, human_controller_1.HumanController.deleteHuman);
module.exports = humanRouter;

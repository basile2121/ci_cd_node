"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//importing modules
const express_1 = __importDefault(require("express"));
const animal_controller_1 = require("../controllers/animal.controller");
const authCheck_1 = require("../middleware/authCheck");
//initiating the router
const animalRouter = express_1.default.Router();
//add animal route
animalRouter.post('/', authCheck_1.checkAuth, animal_controller_1.AnimalController.addAnimal);
//get animals
animalRouter.get('/', authCheck_1.checkAuth, animal_controller_1.AnimalController.getAnimals);
// Libérer tout les animaux de leurs maitres
animalRouter.get('/release', authCheck_1.checkAuth, animal_controller_1.AnimalController.updateAllAnimalsIsDomesticToFalseAndDeleteAssociationWithHuman);
//get single animal
animalRouter.get('/:id', authCheck_1.checkAuth, animal_controller_1.AnimalController.getOneAnimal);
//update a animal
animalRouter.put('/:id', authCheck_1.checkAuth, animal_controller_1.AnimalController.updateAnimal);
//delete a animal
animalRouter.delete('/:id', authCheck_1.checkAuth, animal_controller_1.AnimalController.deleteAnimal);
module.exports = animalRouter;

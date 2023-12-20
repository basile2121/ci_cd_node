//importing modules
import express from 'express';
import { AnimalController } from '../controllers/animal.controller';
import {checkAuth} from '../middleware/authCheck';

//initiating the router
const animalRouter = express.Router();

//add animal route
animalRouter.post('/', checkAuth, AnimalController.addAnimal);

//get animals
animalRouter.get('/', checkAuth,  AnimalController.getAnimals);

// Libérer tout les animaux de leurs maitres
animalRouter.get('/release', checkAuth,  AnimalController.updateAllAnimalsIsDomesticToFalseAndDeleteAssociationWithHuman);

//get single animal
animalRouter.get('/:id', checkAuth, AnimalController.getOneAnimal);

//update a animal
animalRouter.put('/:id', checkAuth, AnimalController.updateAnimal);

//delete a animal
animalRouter.delete('/:id', checkAuth, AnimalController.deleteAnimal);

module.exports = animalRouter;
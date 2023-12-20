//import modules
import {animalServices} from '../services/animal.service';
import {logger} from '../../config/logger';
import {Request, Response} from 'express';
import {AnimalsSchemaValidate} from '../models/animal';
import {humanServices} from '../services/human.service';

class animalController {
    addAnimal = async(req: Request, res: Response) => {
        try {
            const data = {
                name: req.body.name,
                age: req.body.age,
                isDomestic: req.body.isDomestic,
            };
            // Validation de la request
            const {error, value} = AnimalsSchemaValidate.validate(data);

            if (error) {
                logger.error('Controller -> addAnimal : Error while adding animal. Schema not validate : ' + error);
                return res.status(400).send(error.message);
            } else {
                const animal = await animalServices.createAnimal(value);
                logger.info('Controller -> addAnimal : Animals ' + data.name + ' created');
                return res.status(201).send(animal);
            }
        } catch (error) {
            logger.error('Controller -> addAnimal : Error while adding animal: ' + error);
            return res.status(500).send('Internal Server Error');
        }
    };

    getAnimals = async(req: Request, res: Response) => {
        try {
            const animals = await animalServices.getAnimals();
            logger.info('Controller -> getAnimals : Animals fetch');
            return res.status(200).send(animals);
        } catch (error) {
            logger.error('Controller -> getAnimals : Error while fetching animals : ' + error);
            return res.status(500).send('Internal Server Error');
        }
    };

    getOneAnimal = async(req: Request, res: Response) => {
        try {
            //get id from the parameter
            const id = req.params.id;
            const animal = await animalServices.getAnimal(id);
            if (!animal) {
                logger.error('Controller -> getOneAnimal : Animal : ' + id + ' not found');
                return res.status(404).send('Animal not found');
            }
            logger.info('Controller -> getOneAnimal : Animal: ' + animal.name + ' found');
            return res.status(200).json(animal);
        } catch (error) {
            logger.error('Controller -> getOneAnimal : Error while fetching a single animal : ' + error);
            return res.status(500).send('Internal Server Error');
        }
    };

    updateAnimal = async(req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const animal = await animalServices.updateAnimal(id, req.body);
            if (!animal) {
                logger.error('Controller -> updateAnimal : Animal : ' + id + ' not found');
                return res.status(404).send('Animal not found');
            }
            logger.info('Controller -> updateAnimal : Animal: ' + animal.name + ' updated');
            return res.status(200).json(animal);
        } catch (error) {
            logger.error('Controller -> updateAnimal : Error while updating animal : ' + error);
            return res.status(500).send('Internal Server Error');
        }
    };

    deleteAnimal = async(req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const animal = await animalServices.deleteAnimal(id);
            if (!animal) {
                logger.error('Controller -> deleteAnimal : Animal : ' + id + ' not found');
                return res.status(404).send('Animal not found');
            }
            logger.info('Controller -> deleteAnimal : Animal: ' + animal.name + ' deleted');
            return res.status(200).send('Animal deleted');
        } catch (error) {
            logger.error('Controller -> deleteAnimal : Error while deleting animal : ' + error);
            return res.status(500).send('Error while deleting animal : ' + error);
        }
    };

    async updateAllAnimalsIsDomesticToFalseAndDeleteAssociationWithHuman(req: Request, res: Response) {
        try {
            await humanServices.removeAllAnimalsFromAllHumans();
            await animalServices.setAllAnimalsIsDomesticToFalse();

            logger.info('Controller -> updateAllAnimalsIsDomesticToFalseAndDeleteAssociationWithHuman : Mise à jour réussie : Les animaux sont libérés');
            return res.status(200).send('Mise à jour réussie : Les animaux sont libérés');
        } catch (error) {
            logger.error('Controller -> updateAllAnimalsIsDomesticToFalseAndDeleteAssociationWithHuman : Error while updating animal : ' + error);
            return res.status(500).send('Error while updating animal.');
        }
    }
}

//export class
export const AnimalController = new animalController();
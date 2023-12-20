//import modules
import {humanServices} from '../services/human.service';
import {Request, Response} from 'express';
import {HumansSchemaValidate} from '../models/human';
import {animalServices} from '../services/animal.service';
import {logger} from '../../config/logger';

class humanController {
    addHuman = async(req: Request, res: Response) => {
        try {
            const data = {
                name: req.body.name,
                age: req.body.age,
                city: req.body.city,
                birthDate: req.body.birthDate,
                isWorking: req.body.isWorking,
                salary: req.body.salary,
                animals: req.body.animals
            };
            // Validation de la request
            const {error, value} = HumansSchemaValidate.validate(data);

            if (error) {
                return res.status(400).send(error.message);
            } else {
                if (data.animals) {
                    // On vérifie que tous les animaux renseignés existent
                    for (const animalId of data.animals) {
                        const animal = await animalServices.getAnimal(animalId);
                        if (!animal) {
                            logger.error('Controller -> addHuman : Animal : ' + animalId + ' not found');
                            return res.status(404).send("L'animal avec l'id : " + animalId + " n'a pas été trouvé. Impossible d'ajouter l'humain.");
                        } else {
                            // On rend l'animal domestic
                            await animalServices.updateAnimal(animalId, {'isDomestic': true});
                            logger.info('Controller -> addHuman : Animal : ' + animalId + ' updated');
                        }
                    }
                }

                const human = await humanServices.createHuman(value);
                logger.info('Controller -> addHuman : Human ' + data.name + ' created');
                return res.status(201).send(human);
            }
        } catch (error) {
            logger.error('Controller -> addHuman : Error while adding human: ' + error);
            return res.status(500).send('Internal Server Error');
        }
    };

    getHumans = async(req: Request, res: Response) => {
        try {
            const humans = await humanServices.getHumans();
            logger.info('Controller -> getHumans : Human fetch');
            return res.status(200).send(humans);
        } catch (error) {
            logger.error('Controller -> getHumans : Error while fetching humans : ' + error);
            return res.status(500).send('Internal Server Error');
        }
    };


    getOneHuman = async(req: Request, res: Response) => {
        try {
            //get id from the parameter
            const id = req.params.id;
            const human = await humanServices.getHuman(id);
            if (!human) {
                logger.error('Controller -> getOneHuman : Human : ' + id + ' not found');
                return res.status(404).send('Human not found');
            }
            logger.info('Controller -> getOneHuman : Human : ' + human.name + ' found');
            return res.status(200).send(human);
        } catch (error) {
            logger.error('Controller -> getOneHuman : Error while fetching a single human : ' + error);
            return res.status(500).send('Internal Server Error');
        }
    };

    updateHuman = async(req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const human = await humanServices.updateHuman(id, req.body);
            if (!human) {
                logger.error('Controller -> updateHuman : Human : ' + id + ' not found');
                return res.status(404).send('Human not found');
            }
            logger.info('Controller -> updateHuman : Human : ' + human.name + ' updated');
            return res.status(200).send(human);
        } catch (error) {
            logger.error('Controller -> updateHuman : Error while updating human : ' + error);
            return res.status(500).send('Internal Server Error');
        }
    };


    deleteHuman = async(req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const human = await humanServices.deleteHuman(id);
            if (!human) {
                logger.error('Controller -> deleteHuman : Human : ' + id + ' not found');
                return res.status(404).send('Human not found');
            }
            logger.info('Controller -> deleteHuman : Human : ' + human.name + ' deleted');
            return res.status(200).send('Human deleted');
        } catch (error) {
            logger.error('Controller -> deleteHuman : Error while deleting human : ' + error);
            return res.status(500).send('Internal Server Error');
        }
    };

    getHumansWithHighSalaryAndYoungAge = async(req: Request, res: Response) => {
        try {
            const humans = await humanServices.getHumansWithHighSalaryAndYoungAge();
            if (!humans) {
                logger.error('Controller -> getHumansWithHighSalaryAndYoungAge : Humans not found');
                return res.status(404).send('Humans not found');
            }
            logger.info('Controller -> getHumansWithHighSalaryAndYoungAge : Humans fetch');
            return res.status(200).send(humans);
        } catch (error) {
            logger.error('Controller -> getHumansWithHighSalaryAndYoungAge : Error while fetching Humans');
            return res.status(500).send('Internal Server Error');
        }
    };

    /**
     * Récupère les humains qui ont des salaires inférieurs à 1000
     * ET qui ont plus de 40 ans
     * ET qui habitent à Paris
     * ET un animal qui fait exactement 2 fois moins l'âge de l'humain
     */
    async getHumansSpecificCriteria(req: Request, res: Response) {
        try {
            const humans = await humanServices.getHumansMatchingCriteria();
            logger.info('Controller -> getHumansSpecificCriteria : Humans fetch');
            return res.status(200).send(humans);
        } catch (error) {
            logger.error('Controller -> getHumansSpecificCriteria : Erreur lors de la récupération des humains correspondants aux critères spécifiés');
            return res.status(500).json({error: 'Erreur lors de la récupération des humains correspondants aux critères spécifiés.'});
        }
    }
}

//export class
export const HumanController = new humanController();
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalController = void 0;
//import modules
const animal_service_1 = require("../services/animal.service");
const logger_1 = require("../../config/logger");
const animal_1 = require("../models/animal");
const human_service_1 = require("../services/human.service");
class animalController {
    constructor() {
        this.addAnimal = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    name: req.body.name,
                    age: req.body.age,
                    isDomestic: req.body.isDomestic,
                };
                // Validation de la request
                const { error, value } = animal_1.AnimalsSchemaValidate.validate(data);
                if (error) {
                    logger_1.logger.error('Controller -> addAnimal : Error while adding animal. Schema not validate : ' + error);
                    return res.status(400).send(error.message);
                }
                else {
                    const animal = yield animal_service_1.animalServices.createAnimal(value);
                    logger_1.logger.info('Controller -> addAnimal : Animals ' + data.name + ' created');
                    return res.status(201).send(animal);
                }
            }
            catch (error) {
                logger_1.logger.error('Controller -> addAnimal : Error while adding animal: ' + error);
                return res.status(500).send('Internal Server Error');
            }
        });
        this.getAnimals = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const animals = yield animal_service_1.animalServices.getAnimals();
                logger_1.logger.info('Controller -> getAnimals : Animals fetch');
                return res.status(200).send(animals);
            }
            catch (error) {
                logger_1.logger.error('Controller -> getAnimals : Error while fetching animals : ' + error);
                return res.status(500).send('Internal Server Error');
            }
        });
        this.getOneAnimal = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                //get id from the parameter
                const id = req.params.id;
                const animal = yield animal_service_1.animalServices.getAnimal(id);
                if (!animal) {
                    logger_1.logger.error('Controller -> getOneAnimal : Animal : ' + id + ' not found');
                    return res.status(404).send('Animal not found');
                }
                logger_1.logger.info('Controller -> getOneAnimal : Animal: ' + animal.name + ' found');
                return res.status(200).json(animal);
            }
            catch (error) {
                logger_1.logger.error('Controller -> getOneAnimal : Error while fetching a single animal : ' + error);
                return res.status(500).send('Internal Server Error');
            }
        });
        this.updateAnimal = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const animal = yield animal_service_1.animalServices.updateAnimal(id, req.body);
                if (!animal) {
                    logger_1.logger.error('Controller -> updateAnimal : Animal : ' + id + ' not found');
                    return res.status(404).send('Animal not found');
                }
                logger_1.logger.info('Controller -> updateAnimal : Animal: ' + animal.name + ' updated');
                return res.status(200).json(animal);
            }
            catch (error) {
                logger_1.logger.error('Controller -> updateAnimal : Error while updating animal : ' + error);
                return res.status(500).send('Internal Server Error');
            }
        });
        this.deleteAnimal = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const animal = yield animal_service_1.animalServices.deleteAnimal(id);
                if (!animal) {
                    logger_1.logger.error('Controller -> deleteAnimal : Animal : ' + id + ' not found');
                    return res.status(404).send('Animal not found');
                }
                logger_1.logger.info('Controller -> deleteAnimal : Animal: ' + animal.name + ' deleted');
                return res.status(200).send('Animal deleted');
            }
            catch (error) {
                logger_1.logger.error('Controller -> deleteAnimal : Error while deleting animal : ' + error);
                return res.status(500).send('Error while deleting animal : ' + error);
            }
        });
    }
    updateAllAnimalsIsDomesticToFalseAndDeleteAssociationWithHuman(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield human_service_1.humanServices.removeAllAnimalsFromAllHumans();
                yield animal_service_1.animalServices.setAllAnimalsIsDomesticToFalse();
                logger_1.logger.info('Controller -> updateAllAnimalsIsDomesticToFalseAndDeleteAssociationWithHuman : Mise à jour réussie : Les animaux sont libérés');
                return res.status(200).send('Mise à jour réussie : Les animaux sont libérés');
            }
            catch (error) {
                logger_1.logger.error('Controller -> updateAllAnimalsIsDomesticToFalseAndDeleteAssociationWithHuman : Error while updating animal : ' + error);
                return res.status(500).send('Error while updating animal.');
            }
        });
    }
}
//export class
exports.AnimalController = new animalController();

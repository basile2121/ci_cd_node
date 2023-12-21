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
exports.HumanController = void 0;
//import modules
const human_service_1 = require("../services/human.service");
const human_1 = require("../models/human");
const animal_service_1 = require("../services/animal.service");
const logger_1 = require("../../config/logger");
class humanController {
    constructor() {
        this.addHuman = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                const { error, value } = human_1.HumansSchemaValidate.validate(data);
                if (error) {
                    return res.status(400).send(error.message);
                }
                else {
                    if (data.animals) {
                        // On vérifie que tous les animaux renseignés existent
                        for (const animalId of data.animals) {
                            const animal = yield animal_service_1.animalServices.getAnimal(animalId);
                            if (!animal) {
                                logger_1.logger.error('Controller -> addHuman : Animal : ' + animalId + ' not found');
                                return res.status(404).send("L'animal avec l'id : " + animalId + " n'a pas été trouvé. Impossible d'ajouter l'humain.");
                            }
                            else {
                                // On rend l'animal domestic
                                yield animal_service_1.animalServices.updateAnimal(animalId, { 'isDomestic': true });
                                logger_1.logger.info('Controller -> addHuman : Animal : ' + animalId + ' updated');
                            }
                        }
                    }
                    const human = yield human_service_1.humanServices.createHuman(value);
                    logger_1.logger.info('Controller -> addHuman : Human ' + data.name + ' created');
                    return res.status(201).send(human);
                }
            }
            catch (error) {
                logger_1.logger.error('Controller -> addHuman : Error while adding human: ' + error);
                return res.status(500).send('Internal Server Error');
            }
        });
        this.getHumans = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const humans = yield human_service_1.humanServices.getHumans();
                logger_1.logger.info('Controller -> getHumans : Human fetch');
                return res.status(200).send(humans);
            }
            catch (error) {
                logger_1.logger.error('Controller -> getHumans : Error while fetching humans : ' + error);
                return res.status(500).send('Internal Server Error');
            }
        });
        this.getOneHuman = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                //get id from the parameter
                const id = req.params.id;
                const human = yield human_service_1.humanServices.getHuman(id);
                if (!human) {
                    logger_1.logger.error('Controller -> getOneHuman : Human : ' + id + ' not found');
                    return res.status(404).send('Human not found');
                }
                logger_1.logger.info('Controller -> getOneHuman : Human : ' + human.name + ' found');
                return res.status(200).send(human);
            }
            catch (error) {
                logger_1.logger.error('Controller -> getOneHuman : Error while fetching a single human : ' + error);
                return res.status(500).send('Internal Server Error');
            }
        });
        this.updateHuman = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const human = yield human_service_1.humanServices.updateHuman(id, req.body);
                if (!human) {
                    logger_1.logger.error('Controller -> updateHuman : Human : ' + id + ' not found');
                    return res.status(404).send('Human not found');
                }
                logger_1.logger.info('Controller -> updateHuman : Human : ' + human.name + ' updated');
                return res.status(200).send(human);
            }
            catch (error) {
                logger_1.logger.error('Controller -> updateHuman : Error while updating human : ' + error);
                return res.status(500).send('Internal Server Error');
            }
        });
        this.deleteHuman = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const human = yield human_service_1.humanServices.deleteHuman(id);
                if (!human) {
                    logger_1.logger.error('Controller -> deleteHuman : Human : ' + id + ' not found');
                    return res.status(404).send('Human not found');
                }
                logger_1.logger.info('Controller -> deleteHuman : Human : ' + human.name + ' deleted');
                return res.status(200).send('Human deleted');
            }
            catch (error) {
                logger_1.logger.error('Controller -> deleteHuman : Error while deleting human : ' + error);
                return res.status(500).send('Internal Server Error');
            }
        });
        this.getHumansWithHighSalaryAndYoungAge = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const humans = yield human_service_1.humanServices.getHumansWithHighSalaryAndYoungAge();
                if (!humans) {
                    logger_1.logger.error('Controller -> getHumansWithHighSalaryAndYoungAge : Humans not found');
                    return res.status(404).send('Humans not found');
                }
                logger_1.logger.info('Controller -> getHumansWithHighSalaryAndYoungAge : Humans fetch');
                return res.status(200).send(humans);
            }
            catch (error) {
                logger_1.logger.error('Controller -> getHumansWithHighSalaryAndYoungAge : Error while fetching Humans');
                return res.status(500).send('Internal Server Error');
            }
        });
    }
    /**
     * Récupère les humains qui ont des salaires inférieurs à 1000
     * ET qui ont plus de 40 ans
     * ET qui habitent à Paris
     * ET un animal qui fait exactement 2 fois moins l'âge de l'humain
     */
    getHumansSpecificCriteria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const humans = yield human_service_1.humanServices.getHumansMatchingCriteria();
                logger_1.logger.info('Controller -> getHumansSpecificCriteria : Humans fetch');
                return res.status(200).send(humans);
            }
            catch (error) {
                logger_1.logger.error('Controller -> getHumansSpecificCriteria : Erreur lors de la récupération des humains correspondants aux critères spécifiés');
                return res.status(500).json({ error: 'Erreur lors de la récupération des humains correspondants aux critères spécifiés.' });
            }
        });
    }
}
//export class
exports.HumanController = new humanController();

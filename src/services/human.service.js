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
exports.humanServices = exports.humanService = void 0;
// Import module
const human_1 = require("../models/human");
const logger_1 = require("../../config/logger");
class humanService {
    // Create a human
    createHuman(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield human_1.Human.create(data);
            }
            catch (error) {
                logger_1.logger.error('Service -> createHuman : Erreur lors de la création d\'un humain :' + error);
                throw new Error('Erreur lors de la création d\'un humain :' + error);
            }
        });
    }
    // Get all Humans
    getHumans() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield human_1.Human.find({}).populate('animals');
            }
            catch (error) {
                logger_1.logger.error('Service -> getHumans : Erreur lors de la récupération des humains :' + error);
                throw new Error('Erreur lors de la récupération des humains :' + error);
            }
        });
    }
    // Get a single human
    getHuman(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const human = yield human_1.Human.findById({ _id: id }).populate('animals');
                if (!human) {
                    return null;
                }
                return human;
            }
            catch (error) {
                logger_1.logger.error('Service -> getHuman : Erreur lors de la récupération de l\'humain : ' + id + ' ' + error);
                throw new Error('Erreur lors de la récupération de l\'humain : ' + id + ' ' + error);
            }
        });
    }
    //update a human
    updateHuman(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //pass the id of the object you want to update
                //data is for the new body you are updating the old one with
                //new:true, so the dats being returned, is the update one
                const human = yield human_1.Human.findByIdAndUpdate({ _id: id }, data, { new: true });
                if (!human) {
                    return null;
                }
                return human;
            }
            catch (error) {
                logger_1.logger.error('Service -> updateHuman : Erreur lors de la mise à jour de l\'humain : ' + id + ' ' + error);
                throw new Error('Erreur lors de la mise à jour de l\'humain : ' + id + ' ' + error);
            }
        });
    }
    // Delete a human by using the find by id and delete
    deleteHuman(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const human = yield human_1.Human.findById({ _id: id });
                if (!human) {
                    return null;
                }
                yield human_1.Human.findByIdAndDelete({ _id: id });
                return human;
            }
            catch (error) {
                logger_1.logger.error('Service -> deleteHuman : Erreur lors de la suppresion de l\'humain : ' + id + ' ' + error);
                throw new Error('Erreur lors de la suppresion de l\'humain : ' + id + ' ' + error);
            }
        });
    }
    getHumansWithHighSalaryAndYoungAge() {
        return __awaiter(this, void 0, void 0, function* () {
            return human_1.Human.find({
                salary: { $gt: 3000 },
                age: { $lt: 20 },
            }).populate('animals');
        });
    }
    /**
     * Récupère les humains qui ont des salaires inférieurs à 1000
     * ET qui ont plus de 40 ans
     * ET qui habitent à Paris
     * ET un animal qui fait exactement 2 fois moins l'âge de l'humain
     */
    getHumansMatchingCriteria() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const humans = yield human_1.Human.aggregate([
                    {
                        $match: {
                            $and: [
                                { salary: { $lte: 1000 } },
                                { age: { $gte: 40 } },
                                { city: 'Paris' },
                            ],
                        },
                    },
                    {
                        $lookup: {
                            from: 'animals',
                            localField: 'animals',
                            foreignField: '_id',
                            as: 'animalDetails',
                        },
                    },
                    {
                        $addFields: {
                            animalDetails: {
                                $filter: {
                                    input: '$animalDetails',
                                    as: 'animal',
                                    cond: {
                                        $eq: ['$age', { $divide: ['$age', 2] }],
                                    },
                                },
                            },
                        },
                    },
                ]).exec();
                return humans.filter((human) => human.animals.length > 0);
            }
            catch (error) {
                logger_1.logger.error('Service -> getHumansMatchingCriteria : Erreur lors de la récupération des humains correspondants aux critères spécifiés : ' + error);
                throw new Error('Erreur lors de la récupération des humains correspondants aux critères spécifiés : ' + error);
            }
        });
    }
    /**
     * Supprime tous les animaux de tous les humains
     */
    removeAllAnimalsFromAllHumans() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield human_1.Human.updateMany({}, { $set: { animals: [] } }).exec();
            }
            catch (error) {
                logger_1.logger.error('Service -> removeAllAnimalsFromAllHumans : Erreur lors de la suppression de tous les animaux de tous les humains : ' + error);
                throw new Error('Erreur lors de la suppression de tous les animaux de tous les humains : ' + error);
            }
        });
    }
}
exports.humanService = humanService;
//export the class
exports.humanServices = new humanService();

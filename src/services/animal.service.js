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
exports.animalServices = exports.animalService = void 0;
// Import module
const animal_1 = require("../models/animal");
const logger_1 = require("../../config/logger");
class animalService {
    // Create a animal
    createAnimal(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield animal_1.Animal.create(data);
            }
            catch (error) {
                logger_1.logger.error('Service -> createAnimal : Erreur lors de la création d\'un animal :' + error);
                throw new Error('Erreur lors de la création d\'un animal :' + error);
            }
        });
    }
    // Get all Animals
    getAnimals() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield animal_1.Animal.find({});
            }
            catch (error) {
                logger_1.logger.error('Service -> getAnimals : Erreur lors de la récupération des animaux :' + error);
                throw new Error('Erreur lors de la récupération des animaux :' + error);
            }
        });
    }
    // Get a single animal
    getAnimal(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const animal = yield animal_1.Animal.findById({ _id: id });
                if (!animal) {
                    return null;
                }
                return animal;
            }
            catch (error) {
                logger_1.logger.error('Service -> getAnimal : Erreur lors de la récupération de l\'animale : ' + id + ' ' + error);
                throw new Error('Erreur lors de la récupération de l\'animale : ' + id + ' ' + error);
            }
        });
    }
    //update a animal
    updateAnimal(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //pass the id of the object you want to update
                //data is for the new body you are updating the old one with
                //new:true, so the dats being returned, is the update one
                const animal = yield animal_1.Animal.findByIdAndUpdate({ _id: id }, data, { new: true });
                if (!animal) {
                    return null;
                }
                return animal;
            }
            catch (error) {
                logger_1.logger.error('Service -> updateAnimal : Erreur lors de la mise à jour de l\'animale : ' + id + ' ' + error);
                throw new Error('Erreur lors de la mise à jour de l\'animale : ' + id + ' ' + error);
            }
        });
    }
    //delete a animal by using the find by id and delete
    deleteAnimal(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const animal = yield animal_1.Animal.findById(id);
                if (!animal) {
                    return null;
                }
                yield animal_1.Animal.findByIdAndDelete({ _id: id });
                return animal;
            }
            catch (error) {
                logger_1.logger.error('Service -> deleteAnimal : Erreur lors de la suppresion de l\'animale : ' + id + ' ' + error);
                throw new Error('Erreur lors de la suppresion de l\'animale : ' + id + ' ' + error);
            }
        });
    }
    setAllAnimalsIsDomesticToFalse() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield animal_1.Animal.updateMany({}, { isDomestic: false }).exec();
            }
            catch (error) {
                logger_1.logger.error('Service -> setAllAnimalsIsDomesticToFalse : Erreur lors de la mise à jour des animaux :' + error);
                throw new Error('Erreur lors de la mise à jour des animaux :' + error);
            }
        });
    }
}
exports.animalService = animalService;
//export the class
exports.animalServices = new animalService();

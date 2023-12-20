// Import module
import {Animal} from '../models/animal';
import {logger} from '../../config/logger';

export class animalService {
    // Create a animal
    async createAnimal(data: any) {
        try {
            return await Animal.create(data);
        } catch (error) {
            logger.error('Service -> createAnimal : Erreur lors de la création d\'un animal :' + error);
            throw new Error('Erreur lors de la création d\'un animal :' + error);
        }
    }

    // Get all Animals
    async getAnimals() {
        try {
            return await Animal.find({});
        } catch (error) {
            logger.error('Service -> getAnimals : Erreur lors de la récupération des animaux :' + error);
            throw new Error('Erreur lors de la récupération des animaux :' + error);
        }
    }

    // Get a single animal
    async getAnimal(id: string) {

        try {
            const animal = await Animal.findById({_id: id});
            if (!animal) {
                return null;
            }
            return animal;

        } catch (error) {
            logger.error('Service -> getAnimal : Erreur lors de la récupération de l\'animale : ' + id + ' ' + error);
            throw new Error('Erreur lors de la récupération de l\'animale : ' + id + ' ' + error);
        }
    }

    //update a animal
    async updateAnimal(id: string, data: any) {
        try {
            //pass the id of the object you want to update
            //data is for the new body you are updating the old one with
            //new:true, so the dats being returned, is the update one
            const animal = await Animal.findByIdAndUpdate({_id: id}, data, {new: true});
            if (!animal) {
                return null;
            }
            return animal;
        } catch (error) {
            logger.error('Service -> updateAnimal : Erreur lors de la mise à jour de l\'animale : ' + id + ' ' + error);
            throw new Error('Erreur lors de la mise à jour de l\'animale : ' + id + ' ' + error);
        }
    }

    //delete a animal by using the find by id and delete
    async deleteAnimal(id: string) {
        try {
            const animal = await Animal.findById(id);
            if (!animal) {
                return null;
            }

            await Animal.findByIdAndDelete({_id: id});
            return animal;
        } catch (error) {
            logger.error('Service -> deleteAnimal : Erreur lors de la suppresion de l\'animale : ' + id + ' ' + error);
            throw new Error('Erreur lors de la suppresion de l\'animale : ' + id + ' ' + error);
        }
    }

    async setAllAnimalsIsDomesticToFalse(): Promise<void> {
        try {
            await Animal.updateMany({}, {isDomestic: false}).exec();
        } catch (error) {
            logger.error('Service -> setAllAnimalsIsDomesticToFalse : Erreur lors de la mise à jour des animaux :' + error);
            throw new Error('Erreur lors de la mise à jour des animaux :' + error);
        }
    }
}

//export the class
export const animalServices = new animalService();
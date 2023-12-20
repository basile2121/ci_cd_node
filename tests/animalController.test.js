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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const animal_service_1 = require("../src/services/animal.service");
const animal_controller_1 = require("../src/controllers/animal.controller");
const sinon_1 = __importDefault(require("sinon"));
describe('Animal Controller - getAnimals', () => {
    let findStub;
    beforeEach(() => {
        findStub = sinon_1.default.stub(animal_service_1.animalServices, 'getAnimals');
    });
    afterEach(() => {
        findStub.restore();
    });
    it('Doit retourné une liste d\'animaux', () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedAnimals = [
            { name: 'Chien', age: 3, isDomestic: true },
            { name: 'Chat', age: 2, isDomestic: true },
        ];
        findStub.resolves(expectedAnimals);
        const req = {};
        const res = {
            status: (code) => ({
                send: (data) => data,
            }),
            send: (data) => data,
        };
        const result = yield animal_controller_1.AnimalController.getAnimals(req, res);
        (0, chai_1.expect)(findStub.calledOnce).to.be.true;
        (0, chai_1.expect)(result).to.deep.equal(expectedAnimals);
    }));
    it('Doit gérer les erreurs et retourner une erreur 500', () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = 'Some error occurred';
        findStub.rejects(new Error(errorMessage));
        const req = {};
        const res = {
            status: (code) => ({
                send: (data) => data,
            }),
            send: (data) => data,
        };
        const result = yield animal_controller_1.AnimalController.getAnimals(req, res);
        (0, chai_1.expect)(findStub.calledOnce).to.be.true;
        (0, chai_1.expect)(result).to.equal('Internal Server Error');
    }));
});
describe('Animal Controller - addAnimal', () => {
    let createStub;
    beforeEach(() => {
        createStub = sinon_1.default.stub(animal_service_1.animalServices, 'createAnimal');
    });
    afterEach(() => {
        createStub.restore();
    });
    it('Doit créer un nouvelle animal', () => __awaiter(void 0, void 0, void 0, function* () {
        const newAnimal = { name: 'Chien', age: 3, isDomestic: true };
        const expectedAnimal = Object.assign(Object.assign({}, newAnimal), { _id: 'some_unique_id' });
        createStub.resolves(expectedAnimal);
        const req = {
            body: newAnimal,
        };
        const res = {
            status: (code) => ({
                send: (data) => data,
            }),
            send: (data) => data,
        };
        const result = yield animal_controller_1.AnimalController.addAnimal(req, res);
        (0, chai_1.expect)(createStub.calledOnce).to.be.true;
        (0, chai_1.expect)(result).to.deep.equal(expectedAnimal);
    }));
    it('Doit gérer les erreurs et retourner une erreur 400', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidAnimal = { name: 'Chien', age: 'not_a_number', isDomestic: true };
        const req = {
            body: invalidAnimal,
        };
        const res = {
            status: (code) => ({
                send: (data) => data,
            }),
            send: (data) => data,
        };
        const result = yield animal_controller_1.AnimalController.addAnimal(req, res);
        (0, chai_1.expect)(createStub.called).to.be.false;
        (0, chai_1.expect)(result).to.equal('\"age\" must be a number');
    }));
    it('Doit gérer les erreurs de création et retourner une erreur 400', () => __awaiter(void 0, void 0, void 0, function* () {
        const newAnimal = { name: 'Chien', age: 3, isDomestic: true };
        const errorMessage = 'Some error occurred';
        createStub.rejects(new Error(errorMessage));
        const req = {
            body: newAnimal,
        };
        const res = {
            status: (code) => ({
                send: (data) => data,
            }),
            send: (data) => data,
        };
        const result = yield animal_controller_1.AnimalController.addAnimal(req, res);
        (0, chai_1.expect)(createStub.calledOnce).to.be.true;
        (0, chai_1.expect)(result).to.equal('Internal Server Error');
    }));
});
describe('Animal Controller - getOneAnimal', () => {
    let findByIdStub;
    beforeEach(() => {
        findByIdStub = sinon_1.default.stub(animal_service_1.animalServices, 'getAnimal');
    });
    afterEach(() => {
        findByIdStub.restore();
    });
    it('should get a single animal', () => __awaiter(void 0, void 0, void 0, function* () {
        const animalId = 'some_unique_id';
        const expectedAnimal = { _id: animalId, name: 'Chien', age: 3, isDomestic: true };
        findByIdStub.withArgs(animalId).resolves(expectedAnimal);
        const req = {
            params: { id: animalId },
        };
        const res = {
            status: (code) => ({
                json: (data) => data,
            }),
            json: (data) => data,
        };
        const result = yield animal_controller_1.AnimalController.getOneAnimal(req, res);
        (0, chai_1.expect)(findByIdStub.calledOnceWithExactly(animalId)).to.be.true;
        (0, chai_1.expect)(result).to.deep.equal(expectedAnimal);
    }));
    it('Doit gérer les erreurs not found d\'animal et retourner une erreur 404', () => __awaiter(void 0, void 0, void 0, function* () {
        const animalId = 'some_non_existent_id';
        findByIdStub.withArgs(animalId).resolves(null);
        const req = {
            params: { id: animalId },
        };
        const res = {
            status: (code) => ({
                send: (data) => data,
            }),
            send: (data) => data,
        };
        const result = yield animal_controller_1.AnimalController.getOneAnimal(req, res);
        (0, chai_1.expect)(findByIdStub.calledOnceWithExactly(animalId)).to.be.true;
        (0, chai_1.expect)(result).to.equal('Animal not found');
    }));
    it('Doit gérer les erreurs de récupération et retourner une erreur 500', () => __awaiter(void 0, void 0, void 0, function* () {
        const animalId = 'some_unique_id';
        const errorMessage = 'Some error occurred';
        findByIdStub.withArgs(animalId).rejects(new Error(errorMessage));
        const req = {
            params: { id: animalId },
        };
        const res = {
            status: (code) => ({
                send: (data) => data,
            }),
            send: (data) => data,
        };
        const result = yield animal_controller_1.AnimalController.getOneAnimal(req, res);
        (0, chai_1.expect)(findByIdStub.calledOnceWithExactly(animalId)).to.be.true;
        (0, chai_1.expect)(result).to.equal('Internal Server Error');
    }));
});
describe('Animal Controller - updateAnimal', () => {
    let findByIdAndUpdateStub;
    beforeEach(() => {
        findByIdAndUpdateStub = sinon_1.default.stub(animal_service_1.animalServices, 'updateAnimal');
    });
    afterEach(() => {
        findByIdAndUpdateStub.restore();
    });
    it('Doit mettre à jour un animal', () => __awaiter(void 0, void 0, void 0, function* () {
        const animalId = 'some_unique_id';
        const updatedAnimal = { name: 'Chien', age: 4, isDomestic: false };
        const expectedAnimal = Object.assign({ _id: animalId }, updatedAnimal);
        findByIdAndUpdateStub.withArgs(animalId, updatedAnimal).resolves(expectedAnimal);
        const req = {
            params: { id: animalId },
            body: updatedAnimal,
        };
        const res = {
            status: (code) => ({
                json: (data) => data,
            }),
            json: (data) => data,
        };
        const result = yield animal_controller_1.AnimalController.updateAnimal(req, res);
        (0, chai_1.expect)(findByIdAndUpdateStub.calledOnceWithExactly(animalId, updatedAnimal)).to.be.true;
        (0, chai_1.expect)(result).to.deep.equal(expectedAnimal);
    }));
    it('Doit gérer les erreurs d\'animal not found et retourner une erreur 404', () => __awaiter(void 0, void 0, void 0, function* () {
        const animalId = 'some_non_existent_id';
        const updatedAnimal = { name: 'Chien', age: 4, isDomestic: false };
        findByIdAndUpdateStub.withArgs(animalId, updatedAnimal).resolves(null);
        const req = {
            params: { id: animalId },
            body: updatedAnimal,
        };
        const res = {
            status: (code) => ({
                send: (data) => data,
            }),
            send: (data) => data,
        };
        const result = yield animal_controller_1.AnimalController.updateAnimal(req, res);
        (0, chai_1.expect)(findByIdAndUpdateStub.calledOnceWithExactly(animalId, updatedAnimal)).to.be.true;
        (0, chai_1.expect)(result).to.equal('Animal not found');
    }));
    it('Doit gérer les erreurs de mise à jour et retourner une erreur 500', () => __awaiter(void 0, void 0, void 0, function* () {
        const animalId = 'some_unique_id';
        const updatedAnimal = { name: 'Chien', age: 4, isDomestic: false };
        const errorMessage = 'Some error occurred';
        findByIdAndUpdateStub.withArgs(animalId, updatedAnimal).rejects(new Error(errorMessage));
        const req = {
            params: { id: animalId },
            body: updatedAnimal,
        };
        const res = {
            status: (code) => ({
                send: (data) => data,
            }),
            send: (data) => data,
        };
        const result = yield animal_controller_1.AnimalController.updateAnimal(req, res);
        (0, chai_1.expect)(findByIdAndUpdateStub.calledOnceWithExactly(animalId, updatedAnimal)).to.be.true;
        (0, chai_1.expect)(result).to.equal('Internal Server Error');
    }));
});
describe('Animal Controller - deleteAnimal', () => {
    let findByIdAndDeleteStub;
    beforeEach(() => {
        findByIdAndDeleteStub = sinon_1.default.stub(animal_service_1.animalServices, 'deleteAnimal');
    });
    afterEach(() => {
        findByIdAndDeleteStub.restore();
    });
    it('Doit supprimer un animal', () => __awaiter(void 0, void 0, void 0, function* () {
        const animalId = 'some_unique_id';
        const deletedAnimal = { _id: animalId, name: 'Chien', age: 3, isDomestic: true };
        findByIdAndDeleteStub.withArgs(animalId).resolves(deletedAnimal);
        const req = {
            params: { id: animalId },
        };
        const res = {
            status: (code) => ({
                send: (data) => data,
            }),
            send: (data) => data,
        };
        const result = yield animal_controller_1.AnimalController.deleteAnimal(req, res);
        (0, chai_1.expect)(findByIdAndDeleteStub.calledOnceWithExactly(animalId)).to.be.true;
        (0, chai_1.expect)(result).to.equal('Animal deleted');
    }));
    it('Doit gérer les erreurs de not found et retourner une erreur 404', () => __awaiter(void 0, void 0, void 0, function* () {
        const animalId = 'some_non_existent_id';
        findByIdAndDeleteStub.withArgs(animalId).resolves(null);
        const req = {
            params: { id: animalId },
        };
        const res = {
            status: (code) => ({
                send: (data) => data,
            }),
            send: (data) => data,
        };
        const result = yield animal_controller_1.AnimalController.deleteAnimal(req, res);
        (0, chai_1.expect)(findByIdAndDeleteStub.calledOnceWithExactly(animalId)).to.be.true;
        (0, chai_1.expect)(result).to.equal('Animal not found');
    }));
});

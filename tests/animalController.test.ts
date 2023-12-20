import { expect } from 'chai';
import { Response, Request } from 'express';
import { animalServices } from '../src/services/animal.service';
import { AnimalController } from '../src/controllers/animal.controller';
import sinon from 'sinon';

describe('Animal Controller - getAnimals', () => {
  let findStub: sinon.SinonStub;

  beforeEach(() => {
    findStub = sinon.stub(animalServices, 'getAnimals');
  });

  afterEach(() => {
    findStub.restore();
  });

  it('Doit retourné une liste d\'animaux', async() => {
    const expectedAnimals = [
      { name: 'Chien', age: 3, isDomestic: true },
      { name: 'Chat', age: 2, isDomestic: true },
    ];

    findStub.resolves(expectedAnimals);

    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      status: (code: number) => ({
        send: (data: any) => data,
      }) as Response,
      send: (data: any) => data,
    };

    const result = await AnimalController.getAnimals(req as Request, res as Response);

    expect(findStub.calledOnce).to.be.true;
    expect(result).to.deep.equal(expectedAnimals);
  });

  it('Doit gérer les erreurs et retourner une erreur 500', async() => {
    const errorMessage = 'Some error occurred';

    findStub.rejects(new Error(errorMessage));

    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      status: (code: number) => ({
        send: (data: any) => data,
      }) as Response,
      send: (data: any) => data,
    };

    const result = await AnimalController.getAnimals(req as Request, res as Response);

    expect(findStub.calledOnce).to.be.true;
    expect(result).to.equal('Internal Server Error');
  });
});


describe('Animal Controller - addAnimal', () => {
  let createStub: sinon.SinonStub;

  beforeEach(() => {
    createStub = sinon.stub(animalServices, 'createAnimal');
  });

  afterEach(() => {
    createStub.restore();
  });

  it('Doit créer un nouvelle animal', async() => {
    const newAnimal = { name: 'Chien', age: 3, isDomestic: true };
    const expectedAnimal = { ...newAnimal, _id: 'some_unique_id' };

    createStub.resolves(expectedAnimal);

    const req: Partial<Request> = {
      body: newAnimal,
    };
    const res: Partial<Response> = {
      status: (code: number) => ({
        send: (data: any) => data,
      }) as Response,
      send: (data: any) => data,
    };

    const result = await AnimalController.addAnimal(req as Request, res as Response);

    expect(createStub.calledOnce).to.be.true;
    expect(result).to.deep.equal(expectedAnimal);
  });

  it('Doit gérer les erreurs et retourner une erreur 400', async() => {
    const invalidAnimal = { name: 'Chien', age: 'not_a_number', isDomestic: true };

    const req: Partial<Request> = {
      body: invalidAnimal,
    };
    const res: Partial<Response> = {
      status: (code: number) => ({
        send: (data: any) => data,
      }) as Response,
      send: (data: any) => data,
    };

    const result = await AnimalController.addAnimal(req as Request, res as Response);

    expect(createStub.called).to.be.false;
    expect(result).to.equal('\"age\" must be a number');
  });

  it('Doit gérer les erreurs de création et retourner une erreur 400', async() => {
    const newAnimal = { name: 'Chien', age: 3, isDomestic: true };
    const errorMessage = 'Some error occurred';

    createStub.rejects(new Error(errorMessage));

    const req: Partial<Request> = {
      body: newAnimal,
    };
    const res: Partial<Response> = {
      status: (code: number) => ({
        send: (data: any) => data,
      }) as Response,
      send: (data: any) => data,
    };

    const result = await AnimalController.addAnimal(req as Request, res as Response);

    expect(createStub.calledOnce).to.be.true;
    expect(result).to.equal('Internal Server Error');
  });
});

describe('Animal Controller - getOneAnimal', () => {
  let findByIdStub: sinon.SinonStub;

  beforeEach(() => {
    findByIdStub = sinon.stub(animalServices, 'getAnimal');
  });

  afterEach(() => {
    findByIdStub.restore();
  });

  it('should get a single animal', async() => {
    const animalId = 'some_unique_id';
    const expectedAnimal = { _id: animalId, name: 'Chien', age: 3, isDomestic: true };

    findByIdStub.withArgs(animalId).resolves(expectedAnimal);

    const req: Partial<Request> = {
      params: { id: animalId },
    };
    const res: Partial<Response> = {
      status: (code: number) => ({
        json: (data: any) => data,
      }) as Response,
      json: (data: any) => data,
    };

    const result = await AnimalController.getOneAnimal(req as Request, res as Response);

    expect(findByIdStub.calledOnceWithExactly(animalId)).to.be.true;
    expect(result).to.deep.equal(expectedAnimal);
  });

  it('Doit gérer les erreurs not found d\'animal et retourner une erreur 404', async() => {
    const animalId = 'some_non_existent_id';

    findByIdStub.withArgs(animalId).resolves(null);

    const req: Partial<Request> = {
      params: { id: animalId },
    };
    const res: Partial<Response> = {
      status: (code: number) => ({
        send: (data: any) => data,
      }) as Response,
      send: (data: any) => data,
    };

    const result = await AnimalController.getOneAnimal(req as Request, res as Response);

    expect(findByIdStub.calledOnceWithExactly(animalId)).to.be.true;
    expect(result).to.equal('Animal not found');
  });

  it('Doit gérer les erreurs de récupération et retourner une erreur 500', async() => {
    const animalId = 'some_unique_id';
    const errorMessage = 'Some error occurred';

    findByIdStub.withArgs(animalId).rejects(new Error(errorMessage));

    const req: Partial<Request> = {
      params: { id: animalId },
    };
    const res: Partial<Response> = {
      status: (code: number) => ({
        send: (data: any) => data,
      }) as Response,
      send: (data: any) => data,
    };

    const result = await AnimalController.getOneAnimal(req as Request, res as Response);

    expect(findByIdStub.calledOnceWithExactly(animalId)).to.be.true;
    expect(result).to.equal('Internal Server Error');
  });
});

describe('Animal Controller - updateAnimal', () => {
  let findByIdAndUpdateStub: sinon.SinonStub;

  beforeEach(() => {
    findByIdAndUpdateStub = sinon.stub(animalServices, 'updateAnimal');
  });

  afterEach(() => {
    findByIdAndUpdateStub.restore();
  });

  it('Doit mettre à jour un animal', async() => {
    const animalId = 'some_unique_id';
    const updatedAnimal = { name: 'Chien', age: 4, isDomestic: false };
    const expectedAnimal = { _id: animalId, ...updatedAnimal };

    findByIdAndUpdateStub.withArgs(animalId, updatedAnimal).resolves(expectedAnimal);

    const req: Partial<Request> = {
      params: { id: animalId },
      body: updatedAnimal,
    };
    const res: Partial<Response> = {
      status: (code: number) => ({
        json: (data: any) => data,
      }) as Response,
      json: (data: any) => data,
    };

    const result = await AnimalController.updateAnimal(req as Request, res as Response);

    expect(findByIdAndUpdateStub.calledOnceWithExactly(animalId, updatedAnimal)).to.be.true;
    expect(result).to.deep.equal(expectedAnimal);
  });

  it('Doit gérer les erreurs d\'animal not found et retourner une erreur 404', async() => {
    const animalId = 'some_non_existent_id';
    const updatedAnimal = { name: 'Chien', age: 4, isDomestic: false };

    findByIdAndUpdateStub.withArgs(animalId, updatedAnimal).resolves(null);

    const req: Partial<Request> = {
      params: { id: animalId },
      body: updatedAnimal,
    };
    const res: Partial<Response> = {
      status: (code: number) => ({
        send: (data: any) => data,
      }) as Response,
      send: (data: any) => data,
    };

    const result = await AnimalController.updateAnimal(req as Request, res as Response);

    expect(findByIdAndUpdateStub.calledOnceWithExactly(animalId, updatedAnimal)).to.be.true;
    expect(result).to.equal('Animal not found');
  });

  it('Doit gérer les erreurs de mise à jour et retourner une erreur 500', async() => {
    const animalId = 'some_unique_id';
    const updatedAnimal = { name: 'Chien', age: 4, isDomestic: false };
    const errorMessage = 'Some error occurred';

    findByIdAndUpdateStub.withArgs(animalId, updatedAnimal).rejects(new Error(errorMessage));

    const req: Partial<Request> = {
      params: { id: animalId },
      body: updatedAnimal,
    };
    const res: Partial<Response> = {
      status: (code: number) => ({
        send: (data: any) => data,
      }) as Response,
      send: (data: any) => data,
    };

    const result = await AnimalController.updateAnimal(req as Request, res as Response);

    expect(findByIdAndUpdateStub.calledOnceWithExactly(animalId, updatedAnimal)).to.be.true;
    expect(result).to.equal('Internal Server Error');
  });
});

describe('Animal Controller - deleteAnimal', () => {
  let findByIdAndDeleteStub: sinon.SinonStub;

  beforeEach(() => {
    findByIdAndDeleteStub = sinon.stub(animalServices, 'deleteAnimal');
  });

  afterEach(() => {
    findByIdAndDeleteStub.restore();
  });

  it('Doit supprimer un animal', async() => {
    const animalId = 'some_unique_id';
    const deletedAnimal = { _id: animalId, name: 'Chien', age: 3, isDomestic: true };

    findByIdAndDeleteStub.withArgs(animalId).resolves(deletedAnimal);

    const req: Partial<Request> = {
      params: { id: animalId },
    };
    const res: Partial<Response> = {
      status: (code: number) => ({
        send: (data: any) => data,
      }) as Response,
      send: (data: any) => data,
    };

    const result = await AnimalController.deleteAnimal(req as Request, res as Response);

    expect(findByIdAndDeleteStub.calledOnceWithExactly(animalId)).to.be.true;
    expect(result).to.equal('Animal deleted');
  });

  it('Doit gérer les erreurs de not found et retourner une erreur 404', async() => {
    const animalId = 'some_non_existent_id';

    findByIdAndDeleteStub.withArgs(animalId).resolves(null);

    const req: Partial<Request> = {
      params: { id: animalId },
    };
    const res: Partial<Response> = {
      status: (code: number) => ({
        send: (data: any) => data,
      }) as Response,
      send: (data: any) => data,
    };

    const result = await AnimalController.deleteAnimal(req as Request, res as Response);

    expect(findByIdAndDeleteStub.calledOnceWithExactly(animalId)).to.be.true;
    expect(result).to.equal('Animal not found');
  });
});
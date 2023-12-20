//importing modules
import mongoose, {Schema,} from 'mongoose';
import {IAnimals} from './animal';
import Joi from 'joi';

//validation schema
export const HumansSchemaValidate = Joi.object({
    name: Joi.string().required().max(20),
    age: Joi.number().required(),
    city: Joi.string(),
    birthDate: Joi.date(),
    isWorking: Joi.boolean().required(),
    salary: Joi.number().required(),
    animals: Joi.array()
});

//creating an interface
export interface IHumans {
    name: string,
    age: number,
    city: string,
    birthDate: Date,
    isWorking: boolean,
    salary: number,
    animals: IAnimals[]
}

//Human schema
const HumanSchema = new Schema<IHumans>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxlength: 20
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
    },
    city: {
        type: String,
    },
    birthDate: {
        type: Date,
    },
    isWorking: {
        type: Boolean,
        required: [true, 'Is Working is required'],
        default: false
    },
    salary: {
        type: Number,
        required: [true, 'Age is required'],
    },
    animals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'animal',
    }]
});

//creating a models
export const Human = mongoose.model('human', HumanSchema);
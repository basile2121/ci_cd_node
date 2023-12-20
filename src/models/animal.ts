//importing modules
import mongoose, {Schema,} from 'mongoose';
import Joi from 'joi';

//validation schema
export const AnimalsSchemaValidate = Joi.object({
    name: Joi.string().required().max(20),
    age: Joi.number().required(),
    isDomestic: Joi.boolean().required(),
});

//creating an interface
export interface IAnimals {
    name: string,
    age: number,
    isDomestic: boolean,
}

//Animal schema
const AnimalSchema = new Schema<IAnimals>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxlength: 20
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
    },
    isDomestic: {
        type: Boolean,
        required: [true, 'Is Domestic is required'],
        default: false
    },
});

//creating a models
export const Animal = mongoose.model('animal', AnimalSchema);
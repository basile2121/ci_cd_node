"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animal = exports.AnimalsSchemaValidate = void 0;
//importing modules
const mongoose_1 = __importStar(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
//validation schema
exports.AnimalsSchemaValidate = joi_1.default.object({
    name: joi_1.default.string().required().max(20),
    age: joi_1.default.number().required(),
    isDomestic: joi_1.default.boolean().required(),
});
//Animal schema
const AnimalSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxlength: 20
    },
    age: {
        type: Number,
        required: [true, "Age is required"],
    },
    isDomestic: {
        type: Boolean,
        required: [true, "Is Domestic is required"],
        default: false
    },
});
//creating a models
exports.Animal = mongoose_1.default.model("animal", AnimalSchema);

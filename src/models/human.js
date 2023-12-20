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
exports.Human = exports.HumansSchemaValidate = void 0;
//importing modules
const mongoose_1 = __importStar(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
//validation schema
exports.HumansSchemaValidate = joi_1.default.object({
    name: joi_1.default.string().required().max(20),
    age: joi_1.default.number().required(),
    city: joi_1.default.string(),
    birthDate: joi_1.default.date(),
    isWorking: joi_1.default.boolean().required(),
    salary: joi_1.default.number().required(),
    animals: joi_1.default.array()
});
//Human schema
const HumanSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxlength: 20
    },
    age: {
        type: Number,
        required: [true, "Age is required"],
    },
    city: {
        type: String,
    },
    birthDate: {
        type: Date,
    },
    isWorking: {
        type: Boolean,
        required: [true, "Is Working is required"],
        default: false
    },
    salary: {
        type: Number,
        required: [true, "Age is required"],
    },
    animals: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "animal",
        }]
});
//creating a models
exports.Human = mongoose_1.default.model("human", HumanSchema);

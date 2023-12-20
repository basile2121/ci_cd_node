"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
//importing modules
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("./logger");
dotenv_1.default.config();
//details from the env
const username = process.env.LOGIN;
const password = process.env.PASSWORD;
const dbName = process.env.DB_NAME;
const dbUrl = process.env.DB_URL;
//connection string to mongo atlas
const connectionString = `mongodb+srv://${username}:${password}@${dbUrl}/${dbName}?retryWrites=true&w=majority`;
console.log(connectionString);
const options = {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};
//db connection
exports.db = mongoose_1.default.connect(connectionString, options)
    .then(res => {
    if (res) {
        console.log(`Database connection successfully to ${dbName}`);
        logger_1.logger.info(`Database connection successfully to ${dbName}`);
    }
}).catch(err => {
    console.log('`Database connection error', err);
    logger_1.logger.error('`Database connection error', err);
});

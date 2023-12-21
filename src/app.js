"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_config_1 = require("../config/db.config");
const logger_1 = require("../config/logger");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Routers
const authRouter = require('./routes/auth.routes');
const humanRouter = require('./routes/human.routes');
const animalRouter = require('./routes/animal.routes');
const app = (0, express_1.default)();
dotenv_1.default.config();
//middlewares
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//routes
app.use('/api/auth', authRouter);
app.use('/api/humans', humanRouter);
app.use('/api/animals', animalRouter);
//db connection then server connection
db_config_1.db.then(() => {
    app.listen(process.env.PORT, () => logger_1.logger.info('Server is listening on port 3000'));
});

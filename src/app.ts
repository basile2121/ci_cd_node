import express from 'express';
import dotenv from 'dotenv';
import {db} from '../config/db.config';
import {logger} from '../config/logger';
import cookieParser from 'cookie-parser';

// Routers
const authRouter = require('./routes/auth.routes');
const humanRouter = require('./routes/human.routes');
const animalRouter = require('./routes/animal.routes');

const app = express();

dotenv.config();

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//routes
app.use('/api/auth', authRouter);
app.use('/api/humans', humanRouter);
app.use('/api/animals', animalRouter);

//db connection then server connection
db.then(() => {
    app.listen(process.env.PORT, () => logger.info('Server is listening on port 3000'));
});
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';
import dotenv from 'dotenv';

import authRoutes from './authentication/auth.routes';
import budgetRoutes from './budgets/budgets.routes';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));

app.use('/api/v1/authentication', authRoutes);
app.use('/api/v1/budgets', budgetRoutes);

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    app.listen(process.env.PORT, () => {
        console.log(`App is live on port ${ process.env.PORT }`);
    });
});
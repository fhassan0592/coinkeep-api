import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import routes from './main.routes';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1', routes);

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    app.listen(() => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        console.log(`App is live on port ${ process.env.PORT }`);
    });
});
import 'reflect-metadata';
import express from 'express';
import 'dotenv/config';
import { appDataSource } from './database/appDataSource.js';

const app = express();
const PORT = process.env.PORT

appDataSource.initialize()
        .then(() => {
            console.log('banco conectado')
            app.listen(PORT, () => {
                console.log(`Server is running in PORT: ${PORT}`)
            })
        })
        .catch((error) => {
            console.log(error)
        })
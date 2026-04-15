import 'reflect-metadata';
import express from 'express';
import 'dotenv/config';
import { appDataSource } from './database/appDataSource.js';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();






const PORT = process.env.PORT ?? 3000;






















const ALLOWED_ORIGINS = (process.env.CORS_ORIGINS ?? 'http://localhost:4200')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Vary', 'Origin');
  }
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  return next();
});

app.use(express.json());
app.use(routes);
app.use(errorHandler);

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

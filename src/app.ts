import './setup'
import express from 'express';
import cors from 'cors';
import * as AddressesController from './controller/addresses.controller'

const app = express();
app.use(cors());
app.use(express.json());


app.post('/addresses',AddressesController.resolveDistances);



app.get('/health', (req, res) => res.sendStatus(200));

export default app;

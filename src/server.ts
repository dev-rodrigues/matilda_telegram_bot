import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import './configs/container/index';
import routes from './transporLayers/index';

const app = express();

app.use(express.json());
app.use(cors())
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(routes);

const server = app.listen(3333, () => {
  console.log('🚀 Server started on port 3333! 🚀');
});

server.setTimeout(3600000);
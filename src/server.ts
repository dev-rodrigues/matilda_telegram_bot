import cors from 'cors';
import express from 'express';
import 'reflect-metadata';

import './config/container/index';
import "./config/database/index";

import bodyParser from "body-parser";
import routes from "./entrypoint";

const app = express();
app.use(express.json());
app.use(cors())
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(routes);


console.log("Bot has been started 🤖");
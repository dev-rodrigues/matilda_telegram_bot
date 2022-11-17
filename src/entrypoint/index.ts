import { Router } from 'express';
import EventListener from "./event/EventListener";
import CheckServices from "./cron/CheckServices";

const routes = Router();

EventListener.listen().then(r => console.log('Listening for events'));
new CheckServices();

export default routes;
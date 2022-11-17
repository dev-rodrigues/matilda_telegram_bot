import { Router } from 'express';
import EventListener from "./event/EventListener";
import CheckServicesDown from "./cron/CheckServicesDown";
import CheckServicesTurnUp from "./cron/CheckServicesTurnUp";

const routes = Router();

EventListener.listen().then(r => console.log('Listening for events'));
new CheckServicesDown();
new CheckServicesTurnUp();

export default routes;
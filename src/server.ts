import 'reflect-metadata';

import './config/container/index';
import "./config/database/index";

import EventListener from "./entrypoint/event/EventListener";

const eventListener = new EventListener();
eventListener.listen().then(r => console.log("Listening for events..."));

console.log("Bot has been started 🤖");
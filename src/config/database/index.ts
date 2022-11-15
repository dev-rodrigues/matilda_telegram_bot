import initJSONDatabase from "./config";

const defaultState = {
    users: [],
};

const database = initJSONDatabase(defaultState);

export default database;
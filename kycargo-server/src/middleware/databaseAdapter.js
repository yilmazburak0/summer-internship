import ErrorResponse from "helpers/errorResponse";

const mongoose = require("mongoose");


const connections = {};

export function getDatabaseConnection(dbName) {

    if (connections[dbName]) {
        return connections[dbName];
    } else {

        connections[dbName] = mongoose.createConnection(`mongodb://mongoadmin:pcwHV6q7q29YhfeBqdbA3DKqk@185.210.92.231:55385/${dbName}?authSource=admin`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        return connections[dbName];
    }
}

export const registerModel = (dbName, modelName) => {
    const modelScheme = require(`../models/${modelName}`).default;
    return getDatabaseConnection(dbName).model(modelName, modelScheme)
};

const appRoot = require('app-root-path');
const {ObjectID} = require("mongodb");

const {mongoose} = require("/server/db/mongoose");
const {Topic} = require(appRoot + "/server/models/topic");

data = {'id': 3, 'gas': 30, 'temperature': 50, 'humidity': 60, 'sound': 200};


let topic = new Topic({
    topic: "temperature",
    value: 99.3,
    lat: 11.2233,
    lng: 22.3824,
    nodeID: data.id,
});

topic
    .save()
    .then(() => {
        console.log("Data has been stored successfully..");
    })
    .catch(e => {
        console.log("Failed to save data:", e);
    });
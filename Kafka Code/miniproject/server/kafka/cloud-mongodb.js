/** You can consider zookeeper server as a consumer that listens to all topics
 that needed to be stored in the db
 */

const appRoot = require('app-root-path');
const {ObjectID} = require("mongodb");
let kafka = require('kafka-node');

const {mongoose} = require(appRoot + "/server/db/mongoose");
const {Topic} = require(appRoot + "/server/models/topic");


//! consumer code
let Consumer = kafka.Consumer;
let Offset = kafka.Offset;
let Client = kafka.KafkaClient;


let topics = [
    {topic: "temperature_topic"},
    {topic: "humidity_topic"},
    {topic: "sound_topic"},
    {topic: "gas_topic"}
];

let client = new Client({kafaHost: 'localhost:9092'});
let options = {autoCommit: true,
    groupId: 'kafka-node-group2'
};

let consumer = new Consumer(client, topics, options);
let offset = new Offset(client);



consumer.on('message', function (message) {
    //! message is already a json object, doesn't need to be parsed
    console.log('message:', message);
    // Save to mongoose
    let topic = new Topic(message);
    topic
        .save()
        .then(() => {
            console.log("Data has been stored successfully..");
        })
        .catch(e => {
            console.log("Failed to save data:", e);
        });


});

consumer.on('error', function (err) {
    console.log('error', err);
});


/*
* If consumer get `offsetOutOfRange` event, fetch data from the smallest(oldest) offset
*/
consumer.on('offsetOutOfRange', function (topic) {
    topic.maxNum = 2;
    offset.fetch([topic], function (err, offsets) {
        if (err) {
            return console.error(err);
        }
        let min = Math.min.apply(null, offsets[topic.topic][topic.partition]);
        consumer.setOffset(topic.topic, topic.partition, min);
    });
});
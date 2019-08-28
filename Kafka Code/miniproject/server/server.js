const express = require("express");
const socketIO = require("socket.io");
let kafka = require('kafka-node');
const path = require("path");
const http = require("http");


const publicPath = path.join(__dirname, "../public");

let app = express();

const server = http.createServer(app);

app.use(express.static(publicPath));


let io = socketIO(server);

io.on("connection", socket => {

    console.log("New user connected");

    socket.on("gas", function (message) {
        if (message.mode !== "enable") {
            console.log("Pause");
            consumer.pauseTopics(["gas_topic"]);
            //consumer.addTopics(['gas_topic'], function (err, added) {});
            //consumer.pause()
        } else {
            console.log("Resume");
            //consumer.resume()
            consumer.resumeTopics(["gas_topic"])
            //consumer.removeTopics(['gas_topic'], function (err, added) {});
        }
    });

    socket.on("sound", function (message) {
        if (message.mode !== "enable") {
            console.log("Pause")
            consumer.pauseTopics(["sound_topic"]);
            //consumer.pauseTopics([{ topic: "gas_topic", partitions: 0 }]);
            //consumer.addTopics(['sound_topic'], function (err, added) {});
            //consumer.pause()
        } else {
            console.log("Resume")
            consumer.resumeTopics(["sound_topic"])
            //consumer.resume()
            //consumer.resumeTopics([{ topic: "gas_topic", partitions: 0 }])
            //consumer.removeTopics(['sound_topic'], function (err, added) {});
        }
    });

    socket.on("temperature", function (message) {
        if (message.mode !== "enable") {
            console.log("Pause")
            consumer.pauseTopics(["temperature_topic"]);
            //consumer.pauseTopics([{ topic: "gas_topic", partitions: 0 }]);
            //consumer.addTopics(['temperature_topic'], function (err, added) {});
            //consumer.pause()
        } else {
            console.log("Resume")
            consumer.resumeTopics(["temperature_topic"])
            //consumer.resume()
            //consumer.resumeTopics([{ topic: "gas_topic", partitions: 0 }])
            //consumer.removeTopics(['temperature_topic'], function (err, added) {});
        }
    });

    socket.on("humidity", function (message) {
        if (message.mode !== "enable") {
            console.log("Pause")
            consumer.pauseTopics(["humidity_topic"]);
            //consumer.pauseTopics([{ topic: "gas_topic", partitions: 0 }]);
            //consumer.addTopics(['humidity_topic'], function (err, added) {});
            //consumer.pause()
        } else {
            console.log("Resume")
            consumer.resumeTopics(["humidity_topic"])
            //consumer.resume()
            //consumer.resumeTopics([{ topic: "gas_topic", partitions: 0 }])
            //consumer.removeTopics(['humidity_topic'], function (err, added) {});
        }
    });

   function handleTopics(message) {
        if (message.mode !== "enable") {
            console.log("Pause")
            consumer.pauseTopics(["humidity_topic"]);
            //consumer.pauseTopics([{ topic: "gas_topic", partitions: 0 }]);
            //consumer.addTopics(['humidity_topic'], function (err, added) {});
            //consumer.pause()
        } else {
            console.log("Resume")
            consumer.resumeTopics(["humidity_topic"])
            //consumer.resume()
            //consumer.resumeTopics([{ topic: "gas_topic", partitions: 0 }])
            //consumer.removeTopics(['humidity_topic'], function (err, added) {});
        }

   }

});

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
    groupId: 'kafka-node-group1'};

let consumer = new Consumer(client, topics, options);
let offset = new Offset(client);


consumer.on('message', function (message) {
    //! message is already a json object, doesn't need to be parsed
    console.log('message received:', message);
    io.emit("message", message);
    console.log("----------------------------------");
    // Save to mongoose
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
server.listen(3006, () => {
    console.log(`Server is up on port 3006`);
});
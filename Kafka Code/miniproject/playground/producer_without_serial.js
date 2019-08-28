let kafka = require('kafka-node');

// Define Kafka producer
let Producer = kafka.Producer;
let KeyedMessage = kafka.KeyedMessage;
let Client = kafka.KafkaClient;
let client = new Client();


let data = null;
data = {'id': Math.floor(Math.random() * 3)+1, 'gas': Math.floor(Math.random() * 21), 'temperature': Math.floor(Math.random() * 101), 'humidity': Math.floor(Math.random() * 101), 'sound': Math.floor(Math.random() * 301)};

let producer = new Producer(client, {requireAcks: 1});


producer.on('ready', function () {
    setInterval(function () {
        if (data !== undefined && data !== null) {
            if (data.id === 1) {
                producer.send([
                    {
                        topic: "temperature_topic", messages: [data.temperature]
                    }, {
                        topic: "humidity_topic",
                        messages: [data.humidity]
                    }
                ], function (
                    err,
                    result
                ) {
                    console.log(err || result);
                    //process.exit();
                });
            } else if (data.id === 2) {
                producer.send([
                    {
                        topic: "sound_topic", messages: [data.sound]
                    },
                    {
                        topic: "temperature_topic", messages: [data.temperature]
                    }
                ], function (
                    err,
                    result
                ) {
                    console.log(err || result);
                    //process.exit();
                });
            } else if (data.id === 3) {
                producer.send([
                    { // {''
                       topic: "gas_topic", messages: [data.gas]
                    }
                ], function (
                    err,
                    result
                ) {
                    console.log(err || result);
                    //process.exit();
                });
            }
        }
        data = {'id': Math.floor(Math.random() * 3)+1, 'gas': Math.floor(Math.random() * 21), 'temperature': Math.floor(Math.random() * 101), 'humidity': Math.floor(Math.random() * 101), 'sound': Math.floor(Math.random() * 301)};
    }, 3000);
});
producer.on('error', function (err) {
    console.log('error', err);
});

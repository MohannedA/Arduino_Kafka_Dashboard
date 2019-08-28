let kafka = require('kafka-node');
// Require the serialport node module
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('/dev/ttyUSB0', {baudRate: 9600});
const parser = port.pipe(new Readline({delimiter: '\n'}));

// Define Kafka producer
let Producer = kafka.Producer;
let KeyedMessage = kafka.KeyedMessage;
let Client = kafka.KafkaClient;
let client = new Client();

// Read the port data
port.on("open", () => {
    console.log('serial port open');
});


let data = null;
//data = {'id': 3, 'gas': 30, 'temperature': 50, 'humidity': 60, 'sound': 200};

parser.on('data', dataFromArduino => {
    try {
        data = JSON.parse(dataFromArduino);
        console.log("data :", dataFromArduino);
    } catch (e) {
        console.log("data corrupted");
        data = null;
    }

});


let producer = new Producer(client, {requireAcks: 1});


producer.on('ready', function () {
    setInterval(function () {
        if (data !== undefined && data !== null) {
            console.log("At ifs: " + data.id);
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
                    //console.log(err || result);
                    //process.exit();
                });
            } else if (data.id === 2) {
                console.log("Good: " + data);
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
                console.log("Greet: " + data.gas);
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
        data = null;
    }, 3000);
});
producer.on('error', function (err) {
    console.log('error', err);
});

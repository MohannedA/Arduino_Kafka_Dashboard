const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('/dev/ttyUSB0', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));
// Read the port data
port.on("open", () => {
    console.log('serial port open');
});
parser.on('data', fd =>{
    console.log(typeof fd);
    console.log(JSON.parse(fd)['gas']);
});

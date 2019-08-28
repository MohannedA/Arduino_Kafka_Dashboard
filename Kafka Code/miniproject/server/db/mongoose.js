const mongoose = require("mongoose");

//setup mongoose to use the built-in promise
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/SensorsKafka", {useNewUrlParser: true})
    .then(() => {
        console.log("Connected to MongoDB");
    }).catch(() => {
    console.log("Can't connect to MongoDB");
});

module.exports = {mongoose};
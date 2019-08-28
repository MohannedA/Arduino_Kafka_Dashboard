let mongoose = require('mongoose');

let Topic = mongoose.model("Topic", {
  topic: {
    required: true,
    minlength: 1,
    type: String
  },
  value: {
    type: String,
    required: true,
  },
  offset: {
    type: Number,
    default: null
  },
  partition: {
    type: Number,
    default: null
  },
  key: {
    type: String,
    default: null
  }
});

module.exports = {Topic};

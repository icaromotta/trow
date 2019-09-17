var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: "string",
    type: "string",
    address: "string",
    address2: "string",
    city: "string",
    state: "string",
    zip: "string",
    lat: "string",
    lng: "string",
    hours: "string"
})

var Store = mongoose.model("Store", schema);
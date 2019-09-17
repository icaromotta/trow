var mongoose = require('mongoose')

var schema = new mongoose.Schema({
    name: "string",
    type: "string",
    price: "string",
    upc: "string",
    shipping: "string",
    description: "string",
    manufacturer: "string",
    model: "string",
    url: "string",
    image: "string"
});

var Product = mongoose.model("Product", schema);
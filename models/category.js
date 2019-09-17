var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: "string"
});

var Category = mongoose.model("Category", schema);
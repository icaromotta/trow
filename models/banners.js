var mongoose = require('mongoose')

var schema = new mongoose.Schema({
  title: "string", 
  description: "string",
  bannerImage: "" 
});

var Banner = mongoose.model("Banner", schema);

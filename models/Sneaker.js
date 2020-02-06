const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {type: String, required:true},
  ref: {type: String, unique:true, required:true},
  sizes: [{type: Number, required:true}],
  description: String,
  image: {type:String, required:true},
  price: {type: Number, required:true},
  category: {type: String, required:true, enum:["men", "women", "kids"]},
  id_tags: [{type: Schema.Types.ObjectId, ref:"Tag"}],
});

const Sneaker = mongoose.model("Sneaker", schema);

module.exports = Sneaker;

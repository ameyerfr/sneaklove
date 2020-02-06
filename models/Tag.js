const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  label: {type: String, required:true, unique:true}
});

const Tag = mongoose.model("Tag", schema);

module.exports = Tag;

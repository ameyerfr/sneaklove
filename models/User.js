const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {type: String, required:true},
  lastname: {type: String, required:true},
  email: {type: String, required:true, unique:true},
  password: {type: String, required:true}
});

const User = mongoose.model("User", schema);

module.exports = User;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    name: String,
    path: String,
    originalName: String
    },
    {
    timestamps: {
        createdAt:"created_at",
        updatedAt: "updated_at"
    }
});

const Image = mongoose.model("Picture", schema);

module.exports = Image;
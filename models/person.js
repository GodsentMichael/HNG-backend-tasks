const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PersonSchema = new Schema(
  {
   name: {
    type: String,
   },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Person", PersonSchema);

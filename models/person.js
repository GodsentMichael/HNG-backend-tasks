const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PersonSchema = new Schema(
  {
   name: {
    type: String,
    unique: true
   },
    email: {
      type: String,
      unique: true,
    },
    age: String,
    address: String,
    phone: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Person", PersonSchema);

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PersonSchema = new Schema(
  {
   name: {
    type: String,
   },
    email: {
      type: String,
      unique: true,
    },
    age: Number,
    address: String,
    phone: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Person", PersonSchema);

const {
  PersonSchema,
  PersonUpdateSchema,
} = require("../validations/personValidation");
const Person = require("../models/person");
const mongoose = require("mongoose");

//To Create a person resource.
exports.createPerson = async (req, res) => {
  const body = PersonSchema.safeParse(req.body);
  console.log("body=>", body)

  if (!body.success) {
    return res.status(400).json({ errors: body.error.issues });
  }
  try {
    const person = await Person.create({
      ...body.data,
    });
    console.log("Person=>", person)
    return res.status(201).json({ name:person.name, id:person._id} );
  } catch (error) {
    res.status(500).json(error);
  }
};

// To get/retrieve the person saved in db.
exports.getPerson = async (req, res) => {
  const user_id = req.params.user_id;
  const person = await Person.findOne({ _id: user_id });

  if (!person) {
    return res.status(404).json({ message: "Person not found" });
  }

  return res.status(200).json({ name:person.name, id:person._id });
};

//To get all persons
exports.getAllPersons = async (req, res) => {
  try {
    const persons = await Person.find({});

    if (!persons) {
      return res.status(404).json({ error: "No persons found" });
    }

    return res.status(200).json(persons);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// To Update Person resource
exports.updatePerson = async (req, res) => {
  const body = PersonUpdateSchema.safeParse(req.body);

  if (!body.success) {
    return res.status(400).json({ errors: body.error.issues });
  }

  try {
    const user_id = req.params.user_id;

    if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(400).json({ error: "Invalid user id" });
      }

    const person = await Person.findOne({_id: user_id})

    if (!person) {
      return res.status(404).json({ error: "Person not found" });
    }

    person.name = body.data.name,
        await person.save();

    return res
      .status(200)
      .json({ name:person.name, id:person._id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// To Delete a Person
exports.deletePerson = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(400).json({ error: "Invalid user id" });
      }

    const deletedPerson = await Person.findOneAndDelete({
      _id: user_id,
    });

    if (!deletedPerson) {
      return res.status(404).json({ error: "Person not found" });
    }
    return res.status(200).json({ message: "Person deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const {
  PersonSchema,
  PersonUpdateSchema,
} = require("../validations/personValidation");
const Person = require("../models/person");

//To Create a person resource.
exports.createPerson = async (req, res) => {
  const body = PersonSchema.safeParse(req.body);

  if (!body.success) {
    return res.status(400).json({ errors: body.error.issues });
  }

  try {
    const person = await Person.create({
      ...body.data,
    });
    return res.status(201).json({ name:person.name, id:person._id} );
  } catch (error) {
    res.status(500).json(error);
  }
};

// To get/retrieve the person saved in db.
exports.getPerson = async (req, res) => {
  const name = req.params.name;
  const person = await Person.findOne({ name: name });

  if (!person) {
    return res.status(404).json({ message: "Person not found" });
  }

  return res.status(200).json({ name:person.name, id:person._id });
};

// To Update Person resource
exports.updatePerson = async (req, res) => {
  const body = PersonUpdateSchema.safeParse(req.body);

  if (!body.success) {
    return res.status(400).json({ errors: body.error.issues });
  }

  try {
    const personName = req.params.name;
    const person = await Person.findOne({
      name: personName,
    });

    if (!person) {
      return res.status(404).json({ error: "Person not found" });
    }

    (person.name = body.data.name),
      (person.age = body.data.age),
      (person.phone = body.data.phone),
      (person.address = body.data.address),
      (person.email = body.data.email);

    person.name = body.data.name;

    const updatedPerson = await person.save();
    return res
      .status(200)
      .json({ name:person.name, id:person._id, email:person.email, age:person.age, phone:person.phone, address:person.address  });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// To Delete a Person
exports.deletePerson = async (req, res) => {
  try {
    const personName = req.params.name;

    const deletedPerson = await Person.findOneAndDelete({
      name: personName,
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

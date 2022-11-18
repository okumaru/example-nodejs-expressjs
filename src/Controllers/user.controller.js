const userModel = require("../Models/user.model");

exports.getAll = async (req, res) => {
  try {
    const data = await userModel.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const data = await userModel.findById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.insert = async (req, res) => {
  try {
    const data = new userModel({
      name: req.body.name,
      age: req.body.age,
    });

    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const dataToUpdate = await userModel.findByIdAndUpdate(
      id,
      updatedData,
      options
    );
    res.status(200).json(dataToUpdate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await userModel.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

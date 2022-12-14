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
    const id = req.params.id;
    const data = await userModel.findById(id).then((res) => {
      if (!res) throw new Error("Cannot find user with id " + id);
      return res;
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.insert = async (req, res) => {
  try {
    const userdata = new userModel({
      fullName: req.body.name,
      email: req.body.email,
      password: req.body.password,
      age: req.body.age,
    });

    const dataToSave = await userdata.save().catch(function (err) {
      throw new Error(err.message);
    });
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

    const dataToUpdate = await userModel
      .findByIdAndUpdate(id, updatedData, options)
      .then((res) => {
        if (!res) throw new Error("Cannot find user with id " + id);
        return res;
      });
    res.status(200).json(dataToUpdate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await userModel.findByIdAndDelete(id).then((res) => {
      if (!res) throw new Error("Cannot find user with id " + id);
      return res;
    });
    res.send(`User document with ${data.fullName} has been deleted..`);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

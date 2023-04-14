const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userJoi, loginJoi } = require("../validation/joiValidation");
// console.log(userModel.find);
// -------------------------CREATE USER---------------------------------

exports.createUser = async (req, res) => {
  try {
    let data = req.body;
    if (Object.keys(data).length == 0)
      return res.status(400).json({ message: "Data to create user is missing" });

    try {
      await userJoi.validateAsync(data);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }

    let findInDb = await userModel.findOne({
      $or: [{ email: data.email.trim() }, { phone: data.phone.trim() }],
    });
    if (findInDb) {
      if (findInDb.email == data.email.trim())
        return res
          .status(400)
          .json({ message: `this email ${findInDb.email} already exists` });
      if (findInDb.phone == data.phone.trim())
        return res
          .status(400)
          .json({ message: `this phone number ${findInDb.phone} already exists` });
    }

    // passwordHashing :
    let password = data.password;
    let saltRounds = 10;
    let encryptPassword = await bcrypt.hash(password, saltRounds);
    data.password = encryptPassword;

    let uCreate = await userModel.create(data);
    return res
      .status(201)
      .json({ message: "User created successfully", data: uCreate });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// ------------------------LOGIN USER----------------------------------

exports.loginUser = async (req, res) => {
  try {
    let data = req.body;
    let { email } = data;
    if (Object.keys(data) == 0)
      return res.status(400).json({ message: "Credentials are  missing" });

    try {
      await loginJoi.validateAsync(req.body);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }

    let findInDb = await userModel.findOne({ email: email });
    if (findInDb) {
      let hashedPassword = bcrypt.compareSync(data.password, findInDb.password);
      if (!hashedPassword)
        return res.status(401).json({ message: "This password is not valid" });

      let token = jwt.sign({ userId: findInDb._id }, "kanbanramban@HAI");
      return res.json({ message: "User logged in successfully", token: token });
    } else {
      return res.status(404).json({ message: "Get register first" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// ----------------------------------------------------------

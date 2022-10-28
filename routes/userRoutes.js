const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const crypto = require("crypto");

router.post("/reg", async (req, res) => {
  try {
    const user = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      role: req.body.role,
      password: req.body.password,
      confirmPass: req.body.confirmPass,
    };

    const alredyReg = await User.findOne({ email: req.body.email });
    if (alredyReg) {
      throw new Error("Email already registered");
    }

    if (user.password != user.confirmPass) {
      throw new Error("Password not matched");
    }

    const hashPass = await bcrypt.hash(user.password, 10);
    const userDb = {
      name: req.body.name,
      email: req.body.email,
      uniqueID: crypto.randomBytes(6).toString("hex"),
      phone: req.body.phone,
      role: req.body.role,
      password: hashPass,
    };
    const newUser = new User(userDb);
    await newUser.save();
    res.send(newUser);
  } catch (err) {
    res.send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      res.send({ message: "Please fill all the fields" });
      throw new Error("Please fill all fields");
    }

    const result = await User.findOne({ email: email });
    if (!result) {
      res.send({ message: "Invalid Email" });
      throw new Error("Email already registered");
    } else {
      const isMatch = await bcrypt.compare(password, result.password);
      if (!isMatch) {
        res.send({ message: "Password not matched" });
        throw new Error("Password not matched");
      } else {
        const token = jwt.sign(
          {
            userId: result.id,
            name: result.name,
            phone: result.phone,
            role: result.role,
            email: result.email,
            uniqueID: result.uniqueID,
          },
          "perera_cluster"
        );

        res.send({ token: token, success: true });
        res.message = "Login Success";
      }
    }
  } catch (err) {
    res.send(err);
  }
});

router.post("/view", async (req, res) => {
  try {
    const token = req.body.token;
    const payload = await jwt.verify(token, "perera_cluster");
    res.send(payload);
  } catch (err) {
    res.send(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.send(err);
  }
});

router.put("/update", async (req, res) => {
  try {
    const id = req.body.id;

    const hashPas1 = await bcrypt.hash(req.body.password, 10);

    const updateUser = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      role: req.body.role,
      password: hashPas1,
    };

    const UpdateUser1 = await User.findByIdAndUpdate(id, updateUser);
    res.send(UpdateUser1);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;

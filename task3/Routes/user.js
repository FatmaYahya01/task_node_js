const express = require("express");
const User = require("../models/user");
// const { auth } = require("../middleware")

const router = express.Router();

router.get("/", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id)
    res.json(user);
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id)
    res.json(user);
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;
    const user = await User.findById(id)
    user.name = name;
    user.age = age
    await user.save();
    res.json(user);
});


router.post("/", async (req, res) => {
    const { age, name } = req.body;
    const newUser = new User({ name, age });
    await newUser.save();
    res.json(newUser);
});

module.exports = router
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');

// Регистрация
router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ message: "User created" });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Логин
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).send({ error: "Invalid credentials" });
  }
  
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.send({ token });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/key");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User  Model
const User = require("../../models/user");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        type: req.body.type,
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              res.json(user);
              res.redirect("/register");
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          username: user.username,
        };
        const token = jwt.sign(payload, keys.secretOrKey, {
          expiresIn: 86400, // 24 hours
        });
        res.status(200).send({
          user: user,
          accessToken: token,
        });
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

//@route Get api/user/candidat
//@desc Get all User
//@acces Public
router.get("/candidat", (req, res) => {
  User.find({ type: "candidat" })
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json({ succes: false }));
});

//@route Get api/user/client
//@desc Get all User
//@acces Public
router.get("/client", (req, res) => {
  User.find({ type: "client" })
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json({ succes: false }));
});

//@route Get api/user/:id
//@desc Get an User by id
//@acces Public
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json({ succes: false }));
});

//@route Get api/user/
//@desc Get all User
//@acces Public
router.get("/candidat", (req, res) => {
  User.find({ type: "candidat" })
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json({ succes: false }));
});

//@route PUT api/update/id
//@desc Update user by id
//@acces Public
router.put("/update/id", (req, res) => {
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update with id=${id}.`,
        });
      } else res.send({ message: "Profil was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating with id= + ${id}`,
      });
    });
});

// @route   DELETE api/user/:id
// @desc    Delete An Item
// @acces   Public

router.delete("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => user.remove().then(() => res.json({ succes: true })))
    .catch((err) => res.status(404).json({ succes: false }));
});

module.exports = router;

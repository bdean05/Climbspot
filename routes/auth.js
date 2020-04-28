const express = require("express");
const router = new express.Router();

const bcrypt = require("bcrypt");
const User = require("../models/User");

router.get("/signin", (req, res, next) => {
  res.render("auth/signin", {
    errorMessage: "error",
  });
});

router.post("/signin", (req, res) => {
  const {
    email,
    password
  } = req.body;
  user
    .foundOne({
      email: email,
    })
    .then((foundUser) => {
      if (!foundUser) {
        errorMessage: "Error, invalid credentials!";
        res.redirect("/auth/signin");
      }
      else {
        if (bcrypt.compareSync(password, foundUser.password)) {
          req.session.currentUser = foundUser;
          res.redirect("/");
        } else {
          errorMessage: "Error, invalid credentials!";
          res.redirect("/auth/signin");
        }
      }
    })
    .catch((dbErr) => {
      console.log(dbErr);
    });
});

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res) => {
  console.log("heyheyehey");
  const {
    username,
    password
  } = req.body;
  console.log(req.body);
  User.findOne({
      username: username,
    }).then((user) => {
      console.log("TOTO");
      if (user) {
        res.render("auth/signup", {
          errorMessage: "the username already exists!",
        });
      } else {
        console.log("hey i'm here");
        const salt = 10;
        const hashPass = bcrypt.hashSync(password, salt);
        const newUser = {
          username,
          password: hashPass,
        };
        User.create(newUser)
          .then((dbSuccess) => {
            console.log("Im HERE");
            res.redirect("/");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch(err => console.log(err))
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
});

module.exports = router;
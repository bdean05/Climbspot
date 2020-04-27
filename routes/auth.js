const express = require("express");
const router = new express.Router();

const bcrypt = require("bcrypt");
const User = require("../models/User");

// const salt = bcrypt.genSaltSync(bcryptSalt);

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  User.findOne({ username: username }).then(user => {
    if (user !== null) {
      res.render("auth/signup", {
        errorMessage: "the username already exists!"
      });
    } else {
      const salt = 10;
      const hashPass = bcrypt.hashSync(password, salt);
      const newUser = {
        username,
        password: hashPass
      };
      User.create(newUser)
        .then(res => {
          res.redirect("/signin");
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  user
    .foundOne({ email: email })
    .then(foundUser => {
      if (!foundUser) {
        errorMessage: "Error, invalid credentials!";
        res.redirect("/auth/signin");
      } else {
        if (bcrypt.compareSync(password, foundUser.password)) {
          req.session.currentUser = foundUser;
          res.redirect("/");
        } else {
          errorMessage: "Error, invalid credentials!";
          res.redirect("/auth/signin");
        }
      }
    })
    .catch(dbErr => {
      console.log(dbErr);
    });
});

router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    res.redirect("/");
  });
});

module.exports = router;

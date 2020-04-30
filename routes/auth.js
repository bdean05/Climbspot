const express = require("express");
const router = new express.Router();

const bcrypt = require("bcrypt");
const User = require("../models/User");

router.get("/signin", (req, res, next) => {
  res.render("auth/signin", {
    errorMessage: "error"
  });
});

router.post("/signin", (req, res) => {
  const {
    username,
    password
  } = req.body;
  User.findOne({
      username: username
    })
    .then(findUser => {
      if (!findUser) {
        errorMessage: "Error, invalid credentials!";
        res.redirect("/auth/signin");
      }
      else {
        if (bcrypt.compareSync(password, findUser.password)) {
          req.session.currentUser = findUser;
          console.log(`${req.session.currentUser.username} is connected`);
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

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res) => {
  const {
    username,
    password
  } = req.body;
  console.log(req.body);
  User.findOne({
      username: username
    })
    .then(dbSuccess => {
      if (dbSuccess) {
        res.render("signup", {
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
          .then(dbSuccess => {
            res.redirect("/auth/signin");
          })
          .catch(err => {
            console.log(err);
          });
      }
    })
    .catch(err => console.log(err));
});

router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    res.redirect("/");
  });
});

module.exports = router;
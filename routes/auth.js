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
  const { email, password } = req.body;
  user
    .foundOne({
      email: email
    })
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

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res) => {
<<<<<<< HEAD
  console.log("heyheyehey");
  const { username, password } = req.body;
  console.log(req.body);
  User.findOne({
    username: username
  })
    .then(user => {
      console.log("TOTO");
=======
  const {
    username,
    password
  } = req.body;
  console.log(req.body);
  User.findOne({
      username: username,
    }).then((user) => {
>>>>>>> 5c559adb8f4036969a37656c313628158f5bbb0f
      if (user) {
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
<<<<<<< HEAD
          .then(dbSuccess => {
            console.log("Im HERE");
            res.redirect("/");
=======
          .then((dbSuccess) => {
            res.redirect("/auth/signin");
>>>>>>> 5c559adb8f4036969a37656c313628158f5bbb0f
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

const express = require("express");
const router = new express.Router();
const Spot = require("../models/Spot");
const requireAuth = require("../middlewares/requireAuth");
const requireAdmin = require("../middlewares/requireAdmin");
const mongoose = require("mongoose");

//Read
router.get("/spots", (req, res) => {
  Spot.find({})
    .then(dbRes => {})
    .catch(err => {
      console.log("err");
    });
});

//create
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
//   .then(self => {
//     console.log("Connected to ${self.connection.name}");
//     Spot.create(spots)
//       .then(createdSpots => console.log(createdSpots))
//       .catch(err => console.log(err));
//   })
//   .catch(err => {
//     console.log(err);
//   });

router.get("/spots/create", (req, res) => {
  res.render("spots/createSpot.hbs", {
    // css: ["form.css"]
  });
});

router.post("/spots", (req, res) => {
  Spot.create(req.body)
    .then(dbRes => {
      Spot.find({})
        .then(dbRes => {
          res.render("/index", {
            spots: dbRes
            // css: ["spots.css],
          });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;

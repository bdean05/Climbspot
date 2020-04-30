const express = require("express");
const router = new express.Router();
const Spot = require("../models/Spot");
const requireAuth = require("../middlewares/requireAuth");
const requireAdmin = require("../middlewares/requireAdmin");

//Read
// router.get("/spots", (req, res) => {
//   Spot.find({})
//     .then(dbRes => {})
//     .catch(err => {
//       console.log("err");
//     });
// });

router.get("/spots/create", (req, res) => {
  res.render("spots/createSpot.hbs", {
    // css: ["form.css"]
  });
});

router.post("/spots/create", (req, res) => {
  Spot.create(req.body)
    .then((dbRes) => {
      Spot.find({})
        .then((dbRes) => {
          res.render("./", {
            spots: dbRes,
            // css: ["spots.css],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/spots/manage", (req, res) => {
  Spot.find({})
    .then((dbRes) => {
      res.render("spots/manageSpot.hbs", {
        spots: dbRes,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Delete
router.get("/spots/delete/:id", (req, res) => {
  Spot.findByIdAndDelete(req.params.id)
    .then((dbResult) => {
      res.redirect("/spots/manage");
    })
    .catch((err) => {
      console.log(err);
    });
});

//Edit
router.get("/spots/edit/:id", (req, res) => {
  Spot.findById(req.params.id)
    .then((dbResult) => {
      res.render("spots/editSpot.hbs", {
        spot: dbResult,
      });
    })
    .catch((dbErr) => {
      console.log(dbErr);
    });
});

router.post("/spots/edit/:id", (req, res) => {
  if (
    req.body.name === "" ||
    req.body.address === "" ||
    req.body.latitude === "" ||
    req.body.longitude === "" ||
    req.body.image === ""
  ) {
    console.log("capoue")
    res.redirect(`/spots/edit/${req.params.id}`);
  } else {
    Spot.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
      .then((dbResult) => {
        console.log(dbResult);
        res.redirect("/spots/manage");
      })
      .catch((dbErr) => {
        console.log(dbErr);
      });
  }
});

module.exports = router;
var express = require("express");
var router = new express.Router();
const Spot = require("../models/Spot");

router.get("/", (req, res) => {
  const inputQuery = req.query.search;
  Spot.find({
    name: {
      $regex: inputQuery || "default",
      $options: "im",
    },
  }).then((dbResult) => {
    res.render("index", {
      spotresult: dbResult,
      title: "Express",
      scripts: ["manySpotsMap.js"],
    });
  });
});

module.exports = router;
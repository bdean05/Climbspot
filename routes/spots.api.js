const express = require("express");
const router = new express.Router();
const Spot = require("../models/Spot");

router.get("/api/spots", (req, res) => {
    Spot.find().then(dbResult => {
        res.status(200).json(dbResult)
    }).catch(err => {
        res.status(500).json(err)
    })
});


router.get("/api/spots/:id", (req, res) => {
    Spot.findById(req.params.id).then(dbResult => {
        res.status(200).json(dbResult)
    }).catch(err => {
        res.status(500).json(err)
    })
});



module.exports = router;
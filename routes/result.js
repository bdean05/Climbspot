const express = require('express');
const router = new express.Router();
const Spot = require("../models/Spot");

router.get('/result/:id', (req, res, next) => {
    Spot.findById(req.params.id)
        .then(searchresultdb => {
            res.render('result', {
                searchresultdb
            })
        })
})

module.exports = router;
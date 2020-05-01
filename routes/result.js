const express = require('express');
const router = new express.Router();
const Spot = require("../models/Spot");

router.get('/result/:id', (req, res, next) => {
    Spot.findById(req.params.id)
        .then(searchresultdb => {
            res.render('result', {
                searchresultdb,
                scripts: ["oneSpotMap.js"]
            })
        })
})

router.get('/result/add-comment/:id', (req, res, next) => {
    Spot.findById(req.params.id)
        .then(searchresultdb_edit => {
            console.log('here on comment page')
            res.render('add-comment', {
                searchresultdb_edit,
                // scripts: ["oneSpotMap.js"]
            })
        })
})


// router.post("/add-comment/:id", (req, res, next) => {
//     const {
//         username,
//         content
//     } = req.body;

//     Spot
//         .findByIdAndUpdate(req.params.id, {
//             comments.username : username,
//             comments.content : content,
//         })
//         .then(() => {
//             // req.flash("success", "artist successfully updated");
//             res.redirect("result")
//         })
//         .catch(next);
// });

module.exports = router;
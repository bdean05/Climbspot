const express = require('express');
const router = new express.Router();
const Spot = require("../models/Spot");

router.get('/teddy-result/:id', (req, res, next) => {
    Spot.findById(req.params.id)
    .populate({path: "comments.username"})
        .then(searchresultdb => {
            console.log(searchresultdb)
            res.render('teddy-result', {
                searchresultdb,
                scripts: ["oneSpotMap.js"]
            })
        })
})

router.get('/teddy-result/teddy-add-comment/:id', (req, res, next) => {
    Spot.findById(req.params.id)
        .then(searchresultdb_edit => {
            console.log('here on comment page')
            res.render('teddy-add-comment', {
                searchresultdb_edit,
                // scripts: ["oneSpotMap.js"]
            })
        })
})


router.post("/teddy-result/teddy-add-comment/:id", (req, res, next) => {
    console.log('hello')

    const newComment = {
        username: req.session.currentUser._id,
        content: req.body.content
    }

    Spot
        .findByIdAndUpdate(req.params.id, {
            $push: {
                comments: newComment
            }
        })
        .then(() => {
            // req.flash("success", "artist successfully updated");
            res.redirect("/teddy-result/" + req.params.id)
        })

});

module.exports = router;
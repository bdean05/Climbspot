const express = require("express");
const router = new express.Router();
const Article = require("../models/Blog");
const requireAuth = require("../middlewares/requireAuth");
const requireAdmin = require("../middlewares/requireAdmin");
const mongoose = require("mongoose");

router.get("/blog", (req, res, next) => {
    Article.find({})
    .then(dbResult => {
        res.render("blog", {
            articles: dbResult,
        }); 
    })
    .catch(err => {
        console.log(err)
    });
});

<<<<<<< HEAD


router.get("/api/blog", (req, res) => {
    Article.find().then(dbResult => {
        res.status(200).json(dbResult)
    }).catch(err => {
        res.status(500).json(err)
    })
});


router.get("/api/blog/:id", (req, res) => {
    Article.findById(req.params.id).then(dbResult => {
        res.status(200).json(dbResult)
    }).catch(err => {
        res.status(500).json(err)
    })
});





module.exports = router
=======
module.exports = router
>>>>>>> 7d090a4b83fcff993db87d21996c3411c8cf8502

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

module.exports = router
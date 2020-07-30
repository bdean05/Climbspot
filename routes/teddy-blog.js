const express = require("express");
const router = new express.Router();
const Article = require("../models/Blog");
const requireAuth = require("../middlewares/requireAuth");
const requireAdmin = require("../middlewares/requireAdmin");
const mongoose = require("mongoose");
const Spot = require("../models/Spot");

router.get("/teddy-blog", (req, res, next) => {
    Article.find()
    .then(articleDB => {
        
        Spot.find()
                .then((spotDB) => {
                        var n = spotDB.length;
                        var randomSpot = spotDB[Math.floor(Math.random() * n)];
                        console.log(randomSpot);

                        res.render("teddy-blog", {
                                articles: articleDB,
                                randomSpot,
                        }); 
                        
                        
                }) 
               

                .catch((err) => {
                        console.log(err)
                })
        
        // res.render("teddy-blog", {
        //         articles: articleDB,
        //  })
        
        })

    .catch(err => {
        console.log(err)
    });
});




// router.get("/teddy-blog", (req, res) => {
//     Article.find()
//     .then(resultDB => {
//         res.status(200).json(resultDB)
//     }).catch(err => {
//         res.status(500).json(err)
//     })
// });


router.get("/teddy-blog/:id", (req, res) => {
    Article.findById(req.params.id)
    .then(resultDB => {
        res.status(200).json(resultDB)
    }).catch(err => {
        res.status(500).json(err)
    })
});





module.exports = router
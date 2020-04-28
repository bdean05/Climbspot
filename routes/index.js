var express = require('express');
var router = express.Router();
const Spot = require('../models/Spot')

// /* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', {
//     title: 'Express',
//     scripts: ["manySpotsMap.js"]
//   });
// });

router.get('/', (req, res, next) => {
  console.log(req.query)
  Spot.find({
      name: req.query.search
    })
    .then((dbResult) => {
      console.log(dbResult)
      res.render("index", {
        spotlist: dbResult,
        title: 'Express',
        scripts: ["manySpotsMap.js"]
      });
    })
})

module.exports = router;
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

router.get('/', (req, res) => {
  console.log(req.query)
  const inputQuery = req.query.search;

  Spot.find({
      name: {
        $regex: inputQuery || "default",
        $options: 'i',
      }
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
const express = require("express");
const router = new express.Router();

router.get("/userEdit", (req, res) => {
  res.render("userEdit.hbs");
});

module.exports = router;

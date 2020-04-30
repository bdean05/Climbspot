const express = require("express");
const router = new express.Router();

router.get("/blog", (req, res, next) => {
    res.render("blog", {
        errorMessage: "error"
    });
});

module.exports = router

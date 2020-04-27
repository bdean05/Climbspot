const express = require("express");
const express = new express.Router();

const user = require("../models/User");

const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

module.exports = router;

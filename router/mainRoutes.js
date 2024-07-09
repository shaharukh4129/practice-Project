const express = require("express");
const router = express.Router()

const userData = require("../controller/user")


router.post("/signup", userData.signup)
router.post("/login", userData.login)



module.exports = router
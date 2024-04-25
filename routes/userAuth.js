const router = require("express").Router()
const { createNewUser, loginUser } = require("../controllers/authController")
const userModel = require("../model/userModel")
const verifyJwt = require("../middleware/verifyJWT")

router
    .post("/register", createNewUser)
    .post("/login", loginUser)
    .get("/all",verifyJwt, async (req, res) => {
        const users = await userModel.find()
        console.log(users);
        res.send("hello")
    })

module.exports = router;
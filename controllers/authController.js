const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt")
require("dotenv").config()

const createNewUser = async (req, res) => {

    try {

        const { username, password } = req.body
        if (!username || !password) return res.Status(400)

        const findUser = await userModel.find({ username })

        if (findUser.length == 0) {
            const hashedPwd = bcrypt.hashSync(password, 10);
            const newuser = new userModel({
                username,
                password: hashedPwd
            });

            await newuser.save();
            console.log(newuser);

            res.status(201).json({ "message": "user created" })
        }
        else res.status(400).json({ "message": "user already exist" })

    } catch (error) {
        console.log(error);
    }
};


const loginUser = async (req, res) => {


    try {
        const { username, password } = req.body
        if (!username || !password) return res.status(400).json({ "error": "Bad request" })

        const userExist = await userModel.find({ username })
        if (userExist.length == 0) return res.status(403).json({ "message": "user doesn't exist" })

        let match = bcrypt.compareSync(password, userExist[0].password)
        if (match) {

            const accessToken = await jwt.sign(
                { username: userExist[0].username },
                process.env.ACCESS_TOKEN,
                { expiresIn: "30s" }
            );

            const refreshToken = await jwt.sign(
                { username: userExist[0].username },
                process.env.REFRESH_TOKEN,
                { expiresIn: "1d" }
            );

            await userModel.updateOne({ username }, {
                $set: {
                    refreshToken
                }
            });
            res.cookie("jwt", refreshToken,{maxAge : 10000,sameSite : "none"})
            return res.status(200).json({ accessToken })

        } else res.status(401).json({"error" : "username and password doesn't match"})


    } catch (err) {
        console.log(err);
    }
}



module.exports = {
    createNewUser,
    loginUser
}
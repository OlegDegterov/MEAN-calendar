const {Router} = require("express");
const router = Router()
const config = require("config");
const jwt = require("jsonwebtoken");
const {check, validationResult} = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");


// /api/auth/register
router.post(
    "/register",
    [
        check("email", "Incorrect email").isEmail(),
        check("password", "Minimum password length 6 characters")
            .isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect registration data"
                })
            }
            const {email, password} = req.body
            const candidate = await User.findOne({email: email})
            if (candidate) {
                return res.status(400).json({message: "Such user already exists"})
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPassword})
            await user.save()
            res.status(201).json({message: "User created"})

        } catch (e) {
            res.status(500).json({message: "Something is wrong try again"})
        }
    })
// /api/auth/login
router.post(
    "/login",
    [
        check("email", "Please enter correct email").normalizeEmail().isEmail(),
        check("password", "Enter your password").exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect login data"
                })
            }
            const {email, password} = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({message: "User does not exist"})
            }
            const  isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: "Wrong password, please try again"})
            }
            const token = jwt.sign(
                {userID:user.id},
                config.get("jwtSecret"),
                {expiresIn: "1h"}
            )
            res.json({token, userId:user.id})



                } catch (e) {
            res.status(500).json({message: "Something is wrong try again"})
        }
    })
module.exports = router
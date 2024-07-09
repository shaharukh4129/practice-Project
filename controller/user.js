const user = require("../model/user");
const { use } = require("../router/mainRoutes");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")


let userData = {
    signup: async (req, res) => {
        try {
            let hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the salt rounds
            let payload = {
                email: req.body.email,
                mobile: req.body.mobile,
                name: req.body.name,
                password: hashedPassword,
                status: req.body.status
            }
            let check = await user.findOne({ email: payload.email })
            if (check) {
                res.status(400).json({
                    status: true,
                    message: "email already exist!",
                })
            } else {
                let savedUser = await new user(payload).save()

                res.status(200).json({
                    status: true,
                    message: "user create successful",
                    data: savedUser
                })
            }
        } catch (error) {
            res.status(500).json({
                staus: false,
                message: "internal server error",
                error: error.message
            })
        }
    },
    login: async (req, res) => {
        let { email, password } = req.body;
        try {
            // Fetch user by email
            let User = await user.findOne({ email });

            if (!User) {
                // If user is not found
                return res.status(404).json({
                    status: false,
                    message: "User not found"
                });
            }

            let isMatchPassword = await bcrypt.compare(password, User.password)

            if (!isMatchPassword) {
                // If password is incorrect
                return res.status(401).json({
                    status: false,
                    message: "Incorrect password",
                });
            }
            let token = jwt.sign({ id: User._id, email: User.email }, process.env.jwt_secret_key, {
                expiresIn: '3d' // Token expiration time
            });
            // If login is successful
            return res.status(200).json({
                status: true,
                message: "Login successful",
                token,
                data: User

            });

        } catch (err) {
            console.error(err); // Log the error for debugging
            return res.status(500).json({
                status: false,
                message: "Internal server error"
            });
        }
    }

}

module.exports = userData;
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {

    try {

        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(409).send({
                message: "Email already exists"
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword
        });

        await newUser.save();

        return res.status(201).send({
            message: "Registered successfully"
        });

    } catch (error) {

        return res.status(500).send({
            message: "Server error"
        });

    }

};

module.exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).send({
                message: "User not found"
            });

        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {

            return res.status(401).send({
                message: "Incorrect email or password"
            });

        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
        );

        return res.status(200).send({
            access: token
        });

    } catch (error) {

        return res.status(500).send({
            message: "Server error"
        });

    }

};

module.exports.getUserDetails = async (req, res) => {

    try {

        const user = await User.findById(req.user.id)
        .select("-password");

        if (!user) {

            return res.status(404).send({
                message: "User not found"
            });

        }

        return res.status(200).send(user);

    } catch (error) {

        console.log(error);

        return res.status(500).send({
            message: error.message
        });

    }

};
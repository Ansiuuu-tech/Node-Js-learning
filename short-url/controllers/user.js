const {v4: uuidv4 } = require('uuid');
const {setUser}=require('../service/auth')
const User=require('../models/user');
async function handleUserSignup(req, res) {
    const { username, email, password } = req.body;
    try {
        await User.create({ name: username, email, password });
        return res.redirect("/");
    } catch (error) {
        return res.render("signup", {
            error: error.code === 11000 ? "Email already exists" : "Failed to signup",
        });
    }
}


async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(400).render("login", {
                error: "Invalid email or password.",
            });
        }

        const token = setUser(user);
        res.cookie("uid", token);
        return res.redirect("/");
    } catch (error) {
        return res.status(500).render("login", {
            error: "An error occurred during login. Please try again.",
        });
    }
}

module.exports = { handleUserSignup, handleUserLogin };
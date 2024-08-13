const User = require('../models/userSchema.js');
const validator = require("email-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.signUp = async(req, res) => {
const {username, email, password} = req.body;

const isValid = validator.validate(email);
if (!isValid)
    return res.json({ error: 'Email is not valid' });
bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
        try {
            const user = await new User({ username, email, password: hash })
                .save()
            res.json({
                msg: "User Signed Up",
                user
            })
        } catch (err) {
            res.json({
                error: "something went wrong"
            })
        }
    })
})
}

module.exports.login = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    const isValid = validator.validate(email);
    if (!isValid)
        return res.json({ error: 'Email is not valid' });
    try {
        const validPass = await bcrypt.compare(password, user.password)
        if (validPass) {
            const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
            res.json({
                token,
                user
            })
        }
    } catch (error) {
        res.json({ msg: "Invalid login details" })
    }
}
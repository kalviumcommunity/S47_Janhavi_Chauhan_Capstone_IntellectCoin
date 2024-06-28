const router = require('express').Router();
const { User } = require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');

router.post('/add', async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(401).send({ error: "Invalid email" });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(401).send({ error: "Invalid email or password" });

        const token = user.generateAuthToken();
        res.status(200).send({ data: token, message: "Logged in successfully" , user});
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

const Validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

module.exports = router;

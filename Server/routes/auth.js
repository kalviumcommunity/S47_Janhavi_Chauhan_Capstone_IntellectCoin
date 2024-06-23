const router = require('express').Router();
const { User } = require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { ValidateLogin } = require('../models/user');

router.post('/add', async (req, res) => {
    try {

        const { error } = ValidateLogin(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(401).send({ error: "Invalid email" });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(401).send({ error: "Invalid password" });

        const token = user.generateAuthToken();
        res.status(200).send({ data: token, message: "Logged in successfully" , user});
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});



module.exports = router;

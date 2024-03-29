const router = require('express').Router();
const { User } = require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');


router.post('/', async(req, res) => {
    try {
        const{error}= Validate(req.body);
        if(error) 
            return res.status(400).send(error.details[0].message);
        const user = await User.findOne({email: req.body.email});
        if(!user)
            return res.status(401).send("Invalid email or password");
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword)
            return res.status(401).send("Invalid email or password");
        const token = user.generateAuthToken();
        res.status(200).send({data: token, message: "Logged in successfully"});
    } catch (error) {
        res.status(500).send({error: error.message});
        
    }
})

const Validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    })
    return schema.validate(data)
}

module.exports = router
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },linkdin: {
        type: String,
        trim: true
       
    },github: {
        type: String,
        trim: true
     
    },
    languages: {
        type: String
        
    },
    CollegeName: {
        type: String,
      
    },
    Degree: {
        type: String,
       
    },
    YearOfStudy: {
        type: String,
      
        trim: true
    },
    Skills: {
        type: String,
        
        trim: true
    },Certificates: {
        type: String,

        trim: true
    },
    PhoneNumber: {
        type: String,
        trim: true
    }

});

// Add method to generate authentication token
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
        expiresIn: "7d"
    });
    return token;
};

// Check if the User model is already defined to prevent OverwriteModelError


// Validation function for user data

const SignupValidator=(data)=> {
    const schema = Joi.object({
        username: Joi.string().required().label("Username"),
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
        pic: Joi.string()
    })

    return schema.validate(data)
}
const Validate = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().label("Username"),
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        pic: Joi.string(),
        linkdin: Joi.string().label("LinkedIn"),
        github: Joi.string().label("GitHub"),
        languages: Joi.string().label("Languages"),
        CollegeName: Joi.string().label("College Name"),
        Degree: Joi.string().label("Degree"),
        YearOfStudy: Joi.string().label("Year of Study"),
        Skills: Joi.string().label("Skills"),
        Certificates: Joi.string().label("Certificates"),
        PhoneNumber: Joi.string().label("Phone Number")
    });
    return schema.validate(data);
};

// Validation function for login data
const ValidateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

const User = mongoose.model('User', userSchema);

module.exports = { User, Validate, ValidateLogin , SignupValidator };

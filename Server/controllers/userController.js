const jwt = require("jsonwebtoken");
const{User} = require("../models/user");
const bcrypt = require("bcrypt");
const { Validate } = require("../models/user");
const {SignupValidator} = require("../models/user");
const Blog = require("../models/Blog");


exports.signup = async (req, res) => {
    try {
        // Destructure the request body
        const { username, firstName, lastName, email, password } = req.body;

        console.log("Request body:", req.body);

        // Validate the request body
        const { error } = SignupValidator(req.body);
        if (error) {
            console.error("Validation error:", error.details[0].message);
            return res.status(400).send({ message: error.details[0].message });
        }

        // Check if the user already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            console.error("User with given email already exists!");
            return res.status(409).send({ message: "User with given email already exist!" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

      

        console.log("Password hashed successfully");

        // Create and save the new user
        user = await new User({ ...req.body, password: hashPassword }).save();

        console.log("User created:", user);


        // Generate authentication token (assuming generateAuthToken is a method on the user instance)
        const token = user.generateAuthToken();

        console.log("Authentication token generated:", token);

        // Send success response
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        console.error("Internal Server Error:", error);
        // Send error response
        res.status(500).send({ message: "Internal Server Error" });
    }
};


exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) return res.status(400).send({message: "User with given email doesn't exist!"});
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send({message: "Invalid Password!"});

        const token = user.generateAuthToken();
        res.status(200).send({data: token, message: "Login Successfull"});
    } catch(error){
        res.status(500).send({message: "Internal Server Error"});

    }

}
exports.UpdateUserDetails = async (req, res) => {
     try {
    //     if (!req.headers.authorization) {
    //         return res.status(401).send({ message: "Unauthenticated - No Authorization Header" });
    //     }

    //     const token = req.headers.authorization.split(" ")[1];
    //     if (!token) return res.status(401).send({ message: "Unauthenticated - No Token" });

    //     let decoded;
        // try {
        //     decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        // } catch (err) {
        //     return res.status(401).send({ message: "Invalid Token", error: err.message });
        // }
        const authHeader = req.headers.authorization;
        if(!authHeader|| !authHeader.startsWith("Bearer ")){
            return res.status(401).send({message: "Unauthenticated"});
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);

        const user = await User.findOne({ _id: decoded._id });
        if (!user) return res.status(401).send({ message: "Unauthenticated - User Not Found" });

        const { username, firstName, lastName, email, pic, linkdin, github, languages, CollegeName, Degree, YearOfStudy, Skills, Certificates, PhoneNumber } = req.body;
        const { error } = Validate({ username, firstName, lastName, email, pic, linkdin, github, languages, CollegeName, Degree, YearOfStudy, Skills, Certificates, PhoneNumber });
        if (error) return res.status(400).send({ message: error.details[0].message });


        user.username = username;
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.pic = pic;
        user.linkdin = linkdin;
        user.github = github;
        user.languages = languages;
        user.CollegeName = CollegeName;
        user.Degree = Degree;
        user.YearOfStudy = YearOfStudy;
        user.Skills = Skills;
        user.Certificates = Certificates;
        user.PhoneNumber = PhoneNumber;

        await user.save();
        res.status(200).send({ message: "User Updated Successfully", data: user });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
};



exports.deleteUserDetails = async (req, res) => {
    try{
        const userId = req.params.id;
        const token = req.headers.authorization.split(" ")[1];
        if(!token) return res.status(401).send({message: "Unauthenticated"});
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        const user = await User.findOne({ _id: decoded._id, "tokens.token": token });
        if(!user) return res.status(401).send({message: "Unauthenticated"});
        const userDelete = await User.findByIdAndDelete(userId);
        if(!userDelete) return res.status(404).send({message: "User Not Found"});
        res.status(200).send({message: "User Deleted Successfully"});
    } catch(error){
        res.status(500).send({message: "Internal Server Error"});
    }
}

// exports.getPostUser = async (req, res) => {
//     try{
//         const users = await User.find({},'email username');
//         if (users.length >0){
//             const userList = users.map(user => {
//                 return {email: user.email, username: user.username || "No username"};
//             })
//             res.status(200).send({data: userList});
//         } else {
//             res.status(404).send({message: "No User Found"});
//         }


//     }
//     catch(error){
//         res.status(500).send({message: "Internal Server Error"});
//     }
// }

exports.verifyUser = async (req, res) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader|| !authHeader.startsWith("Bearer ")){
            return res.status(401).send({message: "Unauthenticated"});
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        const user = await User.findOne({ _id: decoded._id});
        if(!user) return res.status(401).send({message: "Unauthenticated user"});

        res.status(200).send({message: "User Verified Successfully", data: user});
    } catch(error){
        res.status(500).send({message: "Internal Server Error"});
    }
}

// Assuming you have a getAllUsers function
exports.getUser = async (req, res) => {
    try {
        // Verify user authentication
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send({ message: "Unauthenticated" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        const user = await User.findOne({ _id: decoded._id});
        if (!user) return res.status(401).send({ message: "Unauthenticated" });

        res.status(200).send({ message: "User Verified Successfully", user });
        
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
}



     
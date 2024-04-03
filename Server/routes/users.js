const router = require("express").Router();
const { User, Validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/add", async (req, res) => {
  console.log("route visited");
  try {
    const { error } = Validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered");
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send("User created successfully");
    console.log("done");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

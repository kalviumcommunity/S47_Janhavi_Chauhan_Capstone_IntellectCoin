const router = require("express").Router();
const { User, Validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/add", async (req, res) => {
  try {
    const { error } = Validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ error: "User already registered" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user = await new User({ ...req.body, password: hashPassword }).save();

    const token = user.generateAuthToken();


    res.status(201).json({ token, message: "User created successfully" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("/getUser/:id", async (req, res) => {
  // console.log("route visited");
  const { id } = req.params;
  // console.log("userID", id);
  try {
    const user = await User.findById({_id:id});
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ data: user });
  } catch (err) {
    res.status(400).send(err);
  }
});




module.exports = router;

const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });
  try {
    const user = await User.findOne({ email: req.body.email });
    user && res.status(400).json("Email already exist");
    const username = await User.findOne({ username: req.body.username });
    username && res.status(400).json("Username already exist");
    const saveUser = await newUser.save();
    res.status(201).json(saveUser); //201 Create successfully
  } catch (error) {
    res.status(500).json(error); //500 internal server error
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("Wrong password or username"); //401 Unauthorized
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    if (originalPassword !== req.body.password) {
      res.status(401).json("Wrong password or username!");
    }
    const accessToken = jwt.sign( //header, payload, signature
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );
    const {...info} = user._doc;
    res.status(200).json({...info, accessToken});
  } catch (error) {
    res.status(500).json(error);
  }
});
//GET
router.get("/", async (req, res) => {
  try {
    const getUser = await User.find();
    res.status(200).json(getUser);
  } catch (error) {
    res.status(500).json(error);
  }
});
//DELETE
router.delete("/:id", async (req, res) => {
  //:id route parameters
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...!");
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;

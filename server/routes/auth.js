const router = require("express").Router();
const User = require("../models/User");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const user = await newUser.save();
    res.status(201).json(user); //201 Create successfully
  } catch (error) {
    res.status(500).json(error); //500 internal server error
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("Wrong password or username"); //401 Unauthorized
    if (user.password !== req.body.password) {
      res.status(401).json("Wrong password or username!");
    }
    res.status(200).json(user);
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
router.delete("/:id", async (req, res) => { //:id route parameters
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("the movie has been deleted...!");
  } catch (error) {
    res.status(500).json(error);
  }
})
module.exports = router;

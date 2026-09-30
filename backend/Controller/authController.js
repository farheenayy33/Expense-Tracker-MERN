const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const result = await User.findOne({
      email: email,
    });

    if (result) {
      return res.status(409).json({ message: "user mail already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      console.log("encrypted ", hashedPassword);
      console.log(req.body);

      const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
      });

      await user.save();

      res.status(201).json({
        message: "Register Successfully!",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

res.status(200).json({
  message: "login successfully",
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
  },
});  } catch (error) {
    res.status(500).send("incorrect mail or password");
  }
};

module.exports = { registerUser, loginUser };

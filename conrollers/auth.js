const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.signupController = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        errorMessage: "email already exists",
      });
    }
    //new user oluşturma
    const newUser = new User();
    newUser.username = username;
    newUser.email = email;

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();
    //girşin doğru olduğunun mesajı
    res.json({
      successMessage: "Registration success, Please signin.",
    });
  } catch (err) {
    console.log("signupController error");
    res.status(500).json({
      errorMessage: "Server error",
    });
  }
};

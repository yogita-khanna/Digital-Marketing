const User = require("../models/userSchema");
var jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60; //age of cookie to expire automatically

const createToken = (usr) => {
  console.log(usr);
  let params = {
    email: usr.email,
    password: usr.password
  };
  return jwt.sign(params, "kslkdlkhiy8iyiuiuh87y87yhhyg87yugug78uyiy9y87dls", { expiresIn: maxAge });
};

module.exports.signup_post = (req, res) => {
  const { gname, pw,username } = req.body;
  User.find({ username: username })
    .then((user) => {
      console.log(user);
      if (user.length >= 1) {
        console.log("This Mail ALready Exists");
        res.status(409).json({
          message: "This Mail ALready Exists",
        });
      } else {
        if(!gname){
          res.status(401).json({message : 'please enter email'});
        }
           else{
            User.create({ email: gname, password: pw, username:username })
            .then((usr) => {
              res.json({ usr: usr._id, message: 'user has been successfully registered' });
            });
           
           }
      }
    }).catch((err) => {
    //   handleError(err);
      res.status(400).send("error, user not created");
    });
    
};

module.exports.login_post = async (req, res) => {
  const { username, pw } = req.body;
  try {
    const user = await User.login(username, pw);
    const token = createToken(user);
    res.json({ user: user._id, msg: 'Login successful', token });
  } catch (err) {
    if (err.message === 'password did not match') {
      return res.status(401).json({ message: "Password did not match" });
    } else if (err.message === 'incorrect username') {
      return res.status(400).json({ message: "Please enter valid username and password" });
    }
    res.status(500).json({ message: 'An error occurred' });
  }
};

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
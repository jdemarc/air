const User = require('../models/user');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login
};

async function signup(req, res) {
  const user = new User(req.body);

  try {
    await user.save();

    // String
    const token = createJWT(user);

    // Send back an object with property of 'token', value is the string.
    res.json({ token });
  } catch (error) {
    res.status(400).json(error);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (error) {
    return res.status(400).json(error);
  }
}

//------------------------------
// Functions that do not get exported... helpers

function createJWT(user) {
  //args: data payload, secret, (options/optional)
  return jwt.sign(
    { user }, // { user: user }
    SECRET,
    { expiresIn: '24h' } // Unspecified... forever
    // Sliding expiration? Refresh token upon login.
  );
}

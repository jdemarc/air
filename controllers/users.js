const User = require('../models/user');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login,
  index,
  update,
  find
};

async function index(req, res) {
  const users = await User.find({});
  res.status(200).json(users);
}

async function find(req, res) {
  const user = await User.findById(req.body.id);

  try {
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        res.json({
          err: 'User found!',
          status: 200
        });
      } else {
        return res.json({
          err: 'Bad credentials in find.',
          status: 401
        });
      }
    });
  } catch (error) {
    return res.json({
      err: error,
      status: 400,
    })
  }
}

async function signup(req, res) {
  const user = new User(req.body);

  try {
    await user.save();

    const token = createJWT(user);

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
    const response = {
      error,
      status: 400
    }

    return res.json(response);
  }
}

async function update(req, res) {

  const updatedUser = {}

  if (req.body.name) updatedUser.name = req.body.name;
  if (req.body.email) updatedUser.email = req.body.email;
  if (req.body.password) updatedUser.password = req.body.password;

  try {
    const user = await User.findOneAndUpdate( {_id: req.body.id}, updatedUser, function(err, user) {
      if (err) return res.json(user);
    });
    
    const token = createJWT(user);
    return res.json({token});

  } catch (error) {
    return res.status(400).json();
  }
}

// JWT Helper

function createJWT(user) {
  return jwt.sign(
    { user },
    SECRET,
    { expiresIn: '24h' }
  );
}
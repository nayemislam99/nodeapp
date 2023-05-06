const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

// get all user
const getAllUser = async (req, res) => {
  try {
    const allUser = await User.find();
    res.status(200).json({
      status: 'success',
      data: allUser,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error,
    });
  }
};

// new user create
// http://localhost:8000/api/user/create-user
const createUser = async (req, res) => {
  const userExist = await User.find({ email: req.body.email });
  console.log(userExist.length);
  if (userExist.length > 0) {
    res.status(500).json({
      status: 'exists',
      msg: 'User alreay exists',

    });
  } else {
    const bcryptPassword = await bcrypt.hash(req.body.password, 10);
    const newUserObj = {
      name: req.body.name,
      email: req.body.email,
      password: bcryptPassword,
    };
    try {
      const newUser = await new User(newUserObj).save();
      res.status(201).json({
        status: 'success',
        msg: 'Successfully create new user',
        data: newUser,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        error,
      });
    }
  }
};

// user login controller
// http://localhost:8000/api/user/login
const userLogin = async (req, res) => {
  const userExists = await User.find({ email: req.body.email });
  if (userExists.length > 0) {
    const passwordCheck = bcrypt.compare(req.body.password, userExists[0].password);
    if (passwordCheck) {
      const paylaod = {
        // eslint-disable-next-line no-underscore-dangle
        id: userExists[0]._id,
        name: userExists[0].name,
      };
      const token = jwt.sign(paylaod, process.env.JWT_SECRET, {
        expiresIn: '10h',
      });
      res.status(200).json({
        status: 'login',
        token,
      });
    } else {
      res.status(401).json({
        status: 'unauthorized',
        msg: 'Authentications fail!',
      });
    }
  } else {
    res.status(401).json({
      status: 'unauthorized',
      msg: 'Authentications fail!',
    });
  }
};

module.exports = { getAllUser, createUser, userLogin };

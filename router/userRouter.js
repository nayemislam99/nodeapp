const express = require('express');
const { getAllUser, createUser, userLogin } = require('../controller/userController');
const loginVerify = require('../features/loginVerify');

const userRouter = express.Router();

userRouter.get('/', loginVerify, getAllUser);
userRouter.post('/create-user', createUser);
userRouter.post('/login', userLogin);

module.exports = userRouter;

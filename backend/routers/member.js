const express = require('express');
const Member = require('../models/member');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

router.route('/')
.post(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Member.findOne({ where: { email: email } });
    if (!user) {
      res.status(200).send({ message: 'There is no such email',nickname:'' });
    } else if (user.password !== password) {
      res.status(200).send({ message: 'Wrong password',nickname:'' });
    } else {
      const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.cookie("jwt", token, {httpOnly:true}).status(200).send({ message: 'login success', nickname: user.nickname});
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

router.route('/check')
.get(async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if(!token){
      res.status(200).json({isLogined: false});
    } else {
      const userID = jwt.verify(token, process.env.JWT_SECRET);
      const user = await Member.findOne({ where: { id:userID.sub } });
      if(!user){
        res.status(200).json({isLogined: false});
      }
      res.status(200).json({isLogined: true, nickname:user.nickname});
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

router.route('/logout')
.get(async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if(!token){
      return;
    } else {
      res.cookie('jwt','',{maxAge:0}).send();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
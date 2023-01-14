const express = require('express');
const Member = require('../models/member');

const router = express.Router();

router.route('/')
  .post(async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Member.findOne({ where: { email } });
      if (!user) {
        res.status(200).send({ message: 'There is no such email',nickname:'' });
      } else if (user.password !== password) {
        res.status(200).send({ message: 'Wrong password',nickname:'' });
      } else {
        res.status(200).send({ nickname: user.nickname,message:'' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });

router.route('/check')
.post(async (req,res) => {
  try{
    const {nickname} = req.body;
    const user = await Member.findOne({where:{nickname}});
    if(user){
      res.status(200).send({islogined:true});
    } else {
      res.status(200).send({islogined:false});
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
})

module.exports = router;
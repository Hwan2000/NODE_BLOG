const express = require('express');
const Member = require('../models/member');
const bcrypt = require('bcrypt');
require('dotenv').config();


const router = express.Router();

router.route('/')
.post(async (req,res) => {
    try{
        const saltRounds = parseInt(process.env.bcrypt_password);
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        console.log(hashedPassword);
        await Member.create({
            email:req.body.email,
            password: hashedPassword,
            nickname: req.body.nickName,
        })
        res.send('complete');
    } catch(error){
        console.log(error);
    }
})

router.route('/check')
.post(async (req, res) => {
    try {
        if (req.body.email === "" || req.body.nickName === "" || req.body.password === "" || req.body.checkPassword === "") {
            res.status(200).send('Please fill in the blanks');
            return;
        }
        if (req.body.password !== req.body.checkPassword) {
            res.status(200).send('Check your password');
            return;
        }

        const email = await Member.count({ where: { email: req.body.email } });
        if (email > 0) {
            res.status(200).send('This email already exists');
            return;
        }

        const nickName = await Member.count({ where: { nickname: req.body.nickName } });
        if (nickName > 0) {
            res.status(200).send("This nickname already exists");
            return;
        }

        res.status(200).send("success");
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
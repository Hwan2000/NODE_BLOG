const express = require('express');
const Article = require('../models/article');

const router = express.Router();

router.route('/')
.post(async (req,res) => {
    try{
        const newArticle = await Article.create({
            title:req.body.title,
            contents:req.body.contents,
            writer:req.body.writer
        });
        res.json(newArticle);
    } catch (error){
        console.log(error);
    }
})

module.exports = router;
const express = require('express');
const Article = require('../models/article');

 const router = express.Router();

 router.route('/')
 .post(async (req,res) => {
    //console.log(req.body.pageNum);
    const limit = 5;
    const offset = (req.body.pageNum-1)*5;
    try{
        const articles = await Article.findAll({
            limit,
            offset,
            order:[['id','DESC']],
            attributes:['id','title','likes','dislikes','comments_count','writer'],
        })
        res.status(200).json({articles});
    } catch(error) {
        console.error(error);
    }
    
 })

 module.exports = router;
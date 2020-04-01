var express = require('express');
var router = express.Router();
const Chatbot = require('../models').Chatbot;
const Keyword = require('../models').Keyword;


router.patch('/',(req, res) =>{ 
    
    Keyword.findOne({
        where: {keyword: req.body}, // 수정하고자 하는 키워드를 찾음
    })
    .then((keywords)=>{
        Chatbot.update({
            // title: //수정하려는 title
            // content: //수정하려는 내용
        },{
            // where:{id: //입력받는 id}
        })
        .then((chatbots)=>{
            console.log("데이터 update 성공 !!");
        })
        .catch((err)=>{
            console.error(err);
            next(err);
        });
    })
    .catch((err)=>{
        console.error(err);
    });
});


router.delete('/',(req, res) =>{ 
    
    Keyword.findOne({
        where: {keyword: req.body}, // 수정하고자 하는 키워드를 찾음
    })
    .then((keywords)=>{
        Chatbot.destroy({
            // where:{id: //입력받는 id}  //삭제하려는 아이디 
        })
        .then((chatbots)=>{
            console.log("데이터 delete 성공 !!");
        })
        .catch((err)=>{
            console.error(err);
            next(err);
        });
    })
    .catch((err)=>{
        console.error(err);
    });
});


module.exports = router;
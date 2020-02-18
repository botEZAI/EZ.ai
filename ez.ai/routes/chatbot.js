var express = require('express');
var router = express.Router();
const Chatbot = require('../models').Chatbot;
const Keyword = require('../models').Keyword;
router.post('/', function(req, res, next){
  
  Keyword.create({
    keyword: req.body.keywordObject[0].keyword,
  }).
    then(() =>{
      console.log("keyword 통과");
    })
    .catch((err)=>{
      console.error(err);
      next(err);
    });

  Chatbot.create({
   //keyworder: //추가 되는 키워드 아이디 값 넣기,
    type: req.body.keywordObject[0].contents[0].type,
    content: req.body.keywordObject[0].contents[0].content,
    }).
      then(() =>{
        console.log("content 통과");
      })
      .catch((err)=>{
        console.error(err);
        next(err);
    });       
    // // contents 내부 [ { type: 'text', id: 1, entity: '', content: 'gg' } ]
});
module.exports = router;
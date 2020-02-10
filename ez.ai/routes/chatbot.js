var express = require('express');
var router = express.Router();
const Chatbot = require('../models').Chatbot;
router.post('/', function(req, res, next){
    Chatbot.create({
        keyword: req.body.keywordObject[0].keyword,
        type: req.body.keywordObject[0].contents[0].type,
        entity: req.body.keywordObject[0].contents[0].entity,
        content: req.body.keywordObject[0].contents[0].content,
      }).
        then(() =>{
          console.log("통과");
        })
        .catch((err)=>{
          console.error(err);
          next(err);
        });

    console.log("받아지는 것 확인");
    const content= req.body.keywordObject[0].contents[0].type;
 
    // // contents 내부 [ { type: 'text', id: 1, entity: '', content: 'gg' } ]
    console.log(content);
});
module.exports = router;
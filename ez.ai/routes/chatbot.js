var express = require('express');
var router = express.Router();
const Chatbot = require('../models').Chatbot;
const Keyword = require('../models').Keyword;
router.post('/', function(req, res, next){
  const keywordObject = req.body.keywordObject;
  const keyword = req.body.keywordObject[0];
  const contents = req.body.keywordObject[0].contents;
  
  //console.log(contents.length);

  Keyword.create({
    keyword: keyword.keyword,
  }).
    then(() =>{
      console.log("keyword 통과");
    })
    .catch((err)=>{
      console.error(err);
      next(err);
    });
  if(contents){
  for(var i=0;i<contents.length;i++){
  Chatbot.create({
    keyworder: keyword.id,
    type: contents[i].type,
    content: contents[i].content,
    //location에 대한 정보 아직 보류 
    // title : contents[i].content[0].title,
    // latitude : contents[i].content[1].latitude,
    // longtitude: contents[i].content[2].longtitude,
    }).
      then(() =>{
        console.log("content 통과");
      })
      .catch((err)=>{
        console.error(err);
        next(err);
    });  
  }     
}
    // // contents 내부 [ { type: 'text', id: 1, entity: '', content: 'gg' } ]
});
module.exports = router;
var express = require('express');
var router = express.Router();
const Chatbot = require('../models').Chatbot;
const Keyword = require('../models').Keyword;
router.post('/', function(req, res, next){
  console.log(req.body);
  console.log(req.body.k);
  const keyword = req.body.k.keyword;
  const keyword_id = req.body.k.id;
  const contents = req.body.k.contents;
  
  //console.log(contents.length);
  console.log(keyword);
  console.log(contents);
  Keyword.create({
    keyword: keyword,
    })
    .then(() =>{
      console.log("keyword 통과");
    })
    .catch((err)=>{
      console.error(err);
      next(err);
    });
    
  if(contents){
  for(var i=0;i<contents.length;i++){
  Chatbot.create({
    keyworder: keyword_id,
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

});
module.exports = router;
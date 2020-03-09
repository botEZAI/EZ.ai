var express = require('express');
var router = express.Router();
const Chatbot = require('../models').Chatbot;
const Keyword = require('../models').Keyword;
router.post('/', function(req, res, next){
  const post_keyword = req.body.k.keyword;
  const keyword_id = req.body.k.id;
  const contents = req.body.k.contents;
  
  //console.log(contents.length);

  if(post_keyword){
    console.log(post_keyword);
    console.log(contents);
    Keyword.create({
      keyword: post_keyword,
    })
    .then(() =>{
      console.log("keyword 통과");
      for(var i=0;i<contents.length;i++){
        Chatbot.create({
          keyworder: keyword_id,
          type: contents[i].type,
          content: contents[i].content,
        }).
        then(() =>{
          console.log("content 통과");
        }).
          catch((err)=>{
            console.error(err);
            next(err);
        });
      } 
    })
    .catch((err)=>{
      console.error(err);
      next(err);
    });
  }
    
    // for(var i=0;i<contents.length;i++){
    //   Keyword.findOne({
    //     where:{
    //       keyword: post_keyword,
    //     },
    //   })
    //    .then((keywords)=>{
    //       Chatbot.create({
    //         keyworder: keywords.id,
    //         type: contents[i].type,
    //         content: contents[i].content,
    //         //location에 대한 정보 , 정보 입력 불가 
    //         // title : contents[i].title,
    //         // latitude : contents[i].latitude,
    //         // longtitude: contents[i].longtitude,
    //       }).
    //         then(() =>{
    //           console.log("content 통과");
    //         }).
    //           catch((err)=>{
    //             console.error(err);
    //             next(err);
    //            });
    //     });
    //   }
   
});
module.exports = router;
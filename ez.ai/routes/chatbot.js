var express = require('express');
var router = express.Router();
const Chatbot = require('../models').Chatbot;
const Keyword = require('../models').Keyword;
router.post('/', function(req, res, next){
  const post_keyword = req.body.nowKeyword.keyword;
  // const keyword_id = req.body.nowKeyword.keyword.id; DB조회 후 키에 넣기 떄문에 필요 x
  const contents = req.body.nowKeyword.contents;
  console.log(contents[0].content.elem);

  if(post_keyword){
    console.log(post_keyword);
    console.log(contents);
    //리스트 추가 작업 중
    Keyword.create({
      keyword: post_keyword,
    })
    .then((keywords) =>{
      console.log("keyword 통과");
      for(var i=0;i<contents.length;i++){
        Chatbot.create({
          keyworder: keywords.id,
          type: contents[i].type,
          content: contents[i].content,

          //위치 정보 
          title: contents[i].title,
          latitude: contents[i].latitude,
          longtitude: contents[i].longtitude,

          //리스트 정보

          //개수
          //내용 1
          //...f
          //~내용 5
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
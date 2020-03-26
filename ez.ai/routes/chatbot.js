var express = require('express');
var router = express.Router();
const Chatbot = require('../models').Chatbot;
const Keyword = require('../models').Keyword;
router.post('/', function(req, res, next){
  const post_keyword = req.body.nowKeyword.keyword;
  // const keyword_id = req.body.nowKeyword.keyword.id; DB조회 후 키에 넣기 떄문에 필요 x
  const contents = req.body.nowKeyword.contents;
  //리스트

  // {
  // type: 'list',
  // id: 1,
  // listContent: { question: '1', elem: [Array], keywordLink: [Array] }
  // }


  console.log(contents[0].listContent);
  if(post_keyword){
    // console.log(post_keyword);
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
          // 카테고리 (추후 추가 예정)
          // kategorie: contents[i].kategorie,

          //리스트 정보

          question: contents[i].listContent.question,

          //리스트 개수 
          contentLen: contents[i].listContent.contentLen,
          //내용 1
          elem1: contents[i].listContent.elem[1],
          elem2: contents[i].listContent.elem[2],
          elem3: contents[i].listContent.elem[3],
          elem4: contents[i].listContent.elem[4],
          elem5: contents[i].listContent.elem[5],
          elem6: contents[i].listContent.elem[6],
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

});
module.exports = router;
var express = require("express");
var router = express.Router();
const ChatbotData = require('../models').ChatbotData;
const User = require('../models').User;
const Chatbot = require('../models').Chatbot;
const Keyword = require('../models').Keyword;
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");


//post 주소 : /api/chatbotbuild/keyword, /api/chatbotbuild/content


//키워드 선 저장
router.post('/keyword', isLoggedIn, async (req, res, next) => {
  try {
    const newKeyword = await ChatbotData.findOne({
      //botname으로 봇 id 값을 찾음, 추후에는 token으로 조회해야함 토큰 값은 unique하기 때문
      where :{botname: req.name},  
    })
     .then((chatbotData)=>{
       Keyword.Create({
          keyword: req.body.keyword,
          bot_id : ChatbotData.id,
       });
     });
    res.json(newKeyword);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

//content 저장 한개씩 먼저 저장하는 방식으로 하는게 좋음 (데이터 날아감 방지)
// 밑의 정보를 다 보내줘야함, 없는 정보는 빈칸으로 보내줘야함
// ex) text 타입으로 보내면, list 내용들을 "" 로 보내야함
router.post('/content', isLoggedIn, async (req, res, next) => {
  try {
    const newContents = await Keyword.findOne({
      //키워드 명은 unique하기 때문에 중복되지 않는다. 그래서 키워드 명으로 그 키워드 id를 조회
      where :{keyword: req.body.keyword}, 
    })
     .then((keyword)=>{
       chatbot.Create({
          // 외래 키 
          keyworder: keyword.id, // 외래 키에 키워드 아이디를 저장

          //챗봇 정보
          type: req.body.type,
          content: req.body.content,
          
          //위치 정보
          title: req.body.title, //위치의 제목 
          latitude: req.body.latitude,
          longtitude: req.body.longtitude,

          //리스트 정보
          question: req.body.question,  //리스트 질문 
          contentLen: req.body.contentLen, //리스트 길이
          elem1: req.body.elem1,  // 리스트 목록 1
          elem2: req.body.elem2,  // 리스트 목록 2
          elem3: req.body.elem3,  // 리스트 목록 3
          elem4: req.body.elem4,  // 리스트 목록 4
          elem5: req.body.elem5,  // 리스트 목록 5
          elem6: req.body.elem6,  // 리스트 목록 6
       });
     });
    res.json(newContents);
  } catch (e) {
    console.error(e);
    next(e);
  }
});



// router.post("/", function(req, res, next) {
//   const post_keyword = req.body.nowKeyword.keyword;
//   // const keyword_id = req.body.nowKeyword.keyword.id; DB조회 후 키에 넣기 떄문에 필요 x
//   const contents = req.body.nowKeyword.contents;
//   //리스트
//   KeywordObject.create({
//     keyword: JSON.stringify(req.body.keywordObject)
//   }).catch(err => {
//     next(err);
//   });
//   console.log(contents[0].listContent);
//   if (post_keyword) {
//     // console.log(post_keyword);
//     console.log(contents);
//     //리스트 추가 작업 중
//     Keyword.create({
//       keyword: post_keyword
//     })
//       .then(keywords => {
//         console.log("keyword 통과");
//         for (var i = 0; i < contents.length; i++) {
//           Chatbot.create({
//             keyworder: keywords.id,
//             type: contents[i].type,
//             content: contents[i].content,

//             //위치 정보
//             title: contents[i].title,
//             latitude: contents[i].latitude,
//             longtitude: contents[i].longtitude,
//             // 카테고리 (추후 추가 예정)
//             // category: contents[i].category,

//             //리스트 정보

//             question: contents[i].listContent.question,

//             // //리스트 개수
//             contentLen: contents[i].listContent.contentLen,
//             // //내용 1
//             elem1: contents[i].listContent.elem[1],
//             elem2: contents[i].listContent.elem[2],
//             elem3: contents[i].listContent.elem[3],
//             elem4: contents[i].listContent.elem[4],
//             elem5: contents[i].listContent.elem[5],
//             elem6: contents[i].listContent.elem[6]
//             //~내용 5
//           })
//             .then(() => {
//               console.log("content 통과");
//             })
//             .catch(err => {
//               console.error(err);
//               next(err);
//             });
//         }
//       })
//       .catch(err => {
//         console.error(err);
//         next(err);
//       });
//   }
// });


// router.get("/", async (req, res, next) => {
//   try {
//     const data = await KeywordObject.findAll({
//       limit: 1,
//       order: [["createdAt", "DESC"]],
//       attributes: ["keyword"]
//     });
//     res.json(data[0].dataValues);
//   } catch (e) {
//     console.error(e);
//     next(e);
//   }
// });

module.exports = router;
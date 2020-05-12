const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const sequelize = require('./models').sequelize;
const app = express();
sequelize.sync();

//미들웨어 사용
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//DB연결
const ChatbotData = require('./models').ChatbotData;
const User = require('./models').User;

//telegram api
const TelegramBot = require('node-telegram-bot-api'); 

async function findToken(){
    const Tokendata = await ChatbotData.findAll({ //토큰에 대한 정보 탐색 
        attributes:['platformInfo'],
    });
   const Tokendata1 = await JSON.parse(Tokendata[0].platformInfo); //0은 사용자 ID
   const teleToken =  await Tokendata1[2].tokenData; //텔레그램은 2번, 토큰 저장되었음 
   const bot = await new TelegramBot(teleToken, {polling: true}); //텔레그램 작동
   bot.on('message',(msg) => { 
    function logic(array){   //키워드 찾는 함수 
       let contents= [];
       let flag = 0;
       array.forEach(element => {
           if(element.keyword===msg.text) {
               console.log("키워드 찾음", element.keyword);
               contents = element.contents;
               flag=1;
           }
       });
       if(flag==1) return contents;
       else return 0;
   }    
   async function findData(){//키워드를 찾는 main func
       try{
       const data = await ChatbotData.findAll({
         attributes:['data'],
       });
       const data1 = await JSON.parse(data[0].data); //data[0]은 첫번 째 유저, 0에 유저 아이디 필요
      // console.log(data1);
       const contents = await logic(data1);
       if(contents){// 키워드가 있을 때 
           console.log(contents);
           contents.forEach(element => {
               if(element.type==='text') { // 텍스트 타입 
                   bot.sendMessage(msg.chat.id, element.content);
               }
               else if(element.type==='image'){ //이미지 타입 
                   console.log("이미지 타입 통과");
                   console.log(element.content);
                   bot.sendPhoto(msg.chat.id, element.filepath);
               }
               else if(element.type==='audio'){ //오디오 타입 
                   console.log("오디오 타입 통과");
                   console.log(element.content)
                   bot.sendAudio(msg.chat.id, element.filepath);
               }
               else if(element.type==='video'){ //비디오 타입 
                   console.log("비디오 타입 통과");
                   console.log(element.content);
                   bot.sendVideo(msg.chat.id, element.filepath);
               }
               else if(element.type==='image'){ //이미지 타입 
                   console.log("이미지 타입 통과");
                   bot.sendPhoto(msg.chat.id, element.filepath);
               }
               else if(element.type==='list'){ //리스트 타입 
                   console.log("리스트 타입 통과");
                   let list = element.listContent;
                   const question = list.question;
                   const len = list.keywordLen+1;
                   if(len==1){
                       bot.sendMessyage(msg.chat.id, question, {
                           "reply_markup": {
                               "keyboard": [[list.keywordLink[0]]]}
                       });
                   } 
                   else if(len==2){
                       bot.sendMessage(msg.chat.id, question, { 
                           "reply_markup": {
                               "keyboard": [[list.keywordLink[0], list.keywordLink[1]]]}
                       });
                   } 
                   else if(len==3){
                       bot.sendMessage(msg.chat.id, question, {
                           "reply_markup": {
                               "keyboard": [[list.keywordLink[0], list.keywordLink[1]], [list.keywordLink[2]]]}
                       });
                   } 
                   else if(len==4){
                       bot.sendMessage(msg.chat.id, question, {
                           "reply_markup": {
                               "keyboard": [[list.keywordLink[0], list.keywordLink[1]], [list.keywordLink[2], list.keywordLink[3]]]}
                       });
                   } 
                   else if(len==5){
                       bot.sendMessage(msg.chat.id, question, {
                           "reply_markup": {
                               "keyboard": [[list.keywordLink[0], list.keywordLink[1]], [list.keywordLink[2], list.keywordLink[3]], [list.keywordLink[4]]]}
                       });
                   } 
                   else if(len==6){ 
                       bot.sendMessage(msg.chat.id, question, {
                           "reply_markup": {
                               "keyboard": [[list.keywordLink[0], list.keywordLink[1]], [list.keywordLink[2], list.keywordLink[3]], [list.keywordLink[4],list.keywordLink[5]]]}
                       });
                   } 

               }
               else if(element.type==='location'){ // 위치 타입 
                   console.log("위치 타입 통과");
                   console.log(element.title);
               }
           });

       } 
       else {
           console.log("키워드 탐색 실패");
           bot.sendMessage(msg.chat.id, "다시 한번 입력해주세요");
       }
       }
       catch(err){
           console.error(err);
       }
   }
   findData();
});
}

findToken();
// const token = "1031768450:AAFy8Csn6kabeU9AlKf0VLzOFeB6hwxAmaE"
// const bot = new TelegramBot(token, {polling: true});
//indexOf 문자열 내에서 특정한 문자열의 index 값을 리턴한다.
// bot.on('message',(msg) => {
//      function logic(array){   //키워드 찾는 함수 
//         let contents= [];
//         let flag = 0;
//         array.forEach(element => {
//             if(element.keyword===msg.text) {
//                 console.log("키워드 찾음", element.keyword);
//                 contents = element.contents;
//                 flag=1;
//             }
//         });
//         if(flag==1) return contents;
//         else return 0;
//     }    
//     async function findData(){//키워드를 찾는 main func
//         try{
//         const data = await ChatbotData.findAll({
//           attributes:['data'],
//         });
//         const data1 = await JSON.parse(data[0].data); //data[0]은 첫번 째 유저, 0에 유저 아이디 필요
//        // console.log(data1);
//         const contents = await logic(data1);
//         if(contents){// 키워드가 있을 때 
//             console.log(contents);
//             contents.forEach(element => {
//                 if(element.type==='text') { // 텍스트 타입 
//                     bot.sendMessage(msg.chat.id, element.content);
//                 }
//                 else if(element.type==='image'){ //이미지 타입 
//                     console.log("이미지 타입 통과");
//                     console.log(element.content);
//                     bot.sendPhoto(msg.chat.id, element.filepath);
//                 }
//                 else if(element.type==='audio'){ //오디오 타입 
//                     console.log("오디오 타입 통과");
//                     console.log(element.content)
//                     bot.sendAudio(msg.chat.id, element.filepath);
//                 }
//                 else if(element.type==='video'){ //비디오 타입 
//                     console.log("비디오 타입 통과");
//                     console.log(element.content);
//                     bot.sendVideo(msg.chat.id, element.filepath);
//                 }
//                 else if(element.type==='image'){ //이미지 타입 
//                     console.log("이미지 타입 통과");
//                     bot.sendPhoto(msg.chat.id, element.filepath);
//                 }
//                 else if(element.type==='list'){ //리스트 타입 
//                     console.log("리스트 타입 통과");
//                     let list = element.listContent;
//                     const question = list.question;
//                     const len = list.keywordLen+1;
//                     if(len==1){
//                         bot.sendMessyage(msg.chat.id, question, {
//                             "reply_markup": {
//                                 "keyboard": [[list.keywordLink[0]]]}
//                         });
//                     } 
//                     else if(len==2){
//                         bot.sendMessage(msg.chat.id, question, { 
//                             "reply_markup": {
//                                 "keyboard": [[list.keywordLink[0], list.keywordLink[1]]]}
//                         });
//                     } 
//                     else if(len==3){
//                         bot.sendMessage(msg.chat.id, question, {
//                             "reply_markup": {
//                                 "keyboard": [[list.keywordLink[0], list.keywordLink[1]], [list.keywordLink[2]]]}
//                         });
//                     } 
//                     else if(len==4){
//                         bot.sendMessage(msg.chat.id, question, {
//                             "reply_markup": {
//                                 "keyboard": [[list.keywordLink[0], list.keywordLink[1]], [list.keywordLink[2], list.keywordLink[3]]]}
//                         });
//                     } 
//                     else if(len==5){
//                         bot.sendMessage(msg.chat.id, question, {
//                             "reply_markup": {
//                                 "keyboard": [[list.keywordLink[0], list.keywordLink[1]], [list.keywordLink[2], list.keywordLink[3]], [list.keywordLink[4]]]}
//                         });
//                     } 
//                     else if(len==6){ 
//                         bot.sendMessage(msg.chat.id, question, {
//                             "reply_markup": {
//                                 "keyboard": [[list.keywordLink[0], list.keywordLink[1]], [list.keywordLink[2], list.keywordLink[3]], [list.keywordLink[4],list.keywordLink[5]]]}
//                         });
//                     } 

//                 }
//                 else if(element.type==='location'){ // 위치 타입 
//                     console.log("위치 타입 통과");
//                     console.log(element.title);
//                 }
//             });

//         } 
//         else {
//             console.log("키워드 탐색 실패");
//             bot.sendMessage(msg.chat.id, "다시 한번 입력해주세요");
//         }
//         }
//         catch(err){
//             console.error(err);
//         }
//     }
//     findData();
// });


// 챗봇 추가 기능 +++ 
//    bot.forwardMessage(msg.chat.id,  "d");
//    bot.sendAudio(msg.chat.id,'1.mp3');
//    bot.sendDocument(msg.chat.id,'test.docx');
//    bot.sendVideo(msg.chat.id,'1.mp4');
//    bot.sendSticker(msg.chat.id,'test.docx'); // 카카오 이모티콘 같은건가봄 ㅇㅇ
//    bot.sendPhoto(chatId, photo, [options], [fileOptions]) ⇒ Promise
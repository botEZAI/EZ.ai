var express = require('express');
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var sequelize = require('./models').sequelize;
var app = express();
sequelize.sync();

//미들웨어 사용
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const Chatbot = require('./models').Chatbot;
const Keyword = require('./models').Keyword;
const TelegramBot = require('node-telegram-bot-api'); 


//첫번 째 토큰
const token = '1031768450:AAFy8Csn6kabeU9AlKf0VLzOFeB6hwxAmaE';
const bot = new TelegramBot(token, {polling: true});


//indexOf 문자열 내에서 특정한 문자열의 index 값을 리턴한다.
bot.on('message', (msg) => {
    console.log(msg);
    var idnumber = 0; 

    //키워드 먼저 탐색
    Keyword.findAll({
    })
    .then((keyword)=>{
        for(var i = 0;i<keyword.length;i++){
            if (msg.text.toString().toLowerCase().includes(keyword[i].keyword)) {
                idnumber =  keyword[i].id; //키워드가 있다면 해당하는 id를 저장 
                console.log(idnumber);
                console.log("키워드 찾음");
                break;
            }
            if(idnumber==0) bot.sendMessage(msg.chat.id, "키워드를 찾지 못했습니다");
        }
    Chatbot.findAll({
            include:{
            model: Keyword,
            where: {id: idnumber},
               },
            })
            .then((chatbot)=>{
                console.log("콘텐츠 통과");
                console.log(chatbot);
                for(var i = 0;i<chatbot.length;i++){
                    if(chatbot[i].type=="text"){
                        console.log("타입 통과");
                        console.log(chatbot[i].content);  
                        bot.sendMessage(msg.chat.id, chatbot[i].content);
                    }
                    else if(chatbot[i].type=="image"){
                        console.log("타입 통과");
                        bot.sendMessage(msg.chat.id, "사진전송");
                    }
                }
            })
    })
    .catch((err)=>{
        console.error(err);
        next(err);
    });  
});


// 챗봇 추가 기능 +++ 
//    bot.forwardMessage(msg.chat.id,  "d");
//    bot.sendAudio(msg.chat.id,'1.mp3');
//    bot.sendDocument(msg.chat.id,'test.docx');
//    bot.sendVideo(msg.chat.id,'1.mp4');
//    bot.sendSticker(msg.chat.id,'test.docx'); // 카카오 이모티콘 같은건가봄 ㅇㅇ
//    bot.sendPhoto(chatId, photo, [options], [fileOptions]) ⇒ Promise
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


//DB연결
const Chatbot = require('./models').Chatbot;
const Keyword = require('./models').Keyword;

//telegram api
const TelegramBot = require('node-telegram-bot-api'); 


//첫번 째 토큰
const token = 'input token';
const bot = new TelegramBot(token, {polling: true});


//indexOf 문자열 내에서 특정한 문자열의 index 값을 리턴한다.
bot.on('message', (msg) => {
    console.log(msg.text)
    var idnumber = 0; 

    //키워드 먼저 탐색
    Keyword.findOne({
        where: {keyword: msg.text},
    })
    .then((keywords)=>{
        console.log(keywords);
        Chatbot.findAll({
            include:{
            model: Keyword,
            where: {id: keywords.id},
            },
         })
            .then((chatbots)=>{
                console.log("콘텐츠 통과");
                for(var i = 0;i<chatbots.length;i++){
                    if(chatbots[i].type=="text"){
                        console.log("텍스트 타입 통과");
                        bot.sendMessage(msg.chat.id, chatbots[i].content);
                    }
                    else if(chatbots[i].type=="image"){
                        console.log("이미지 타입 통과");
                        bot.sendPhoto(msg.chat.id, chatbots[i].content);
                    }
                    else if(chatbots[i].type=="location"){
                        console.log("위치 타입 통과");
                        bot.sendMessage(msg.chat.id, chatbots[i].title);
                        bot.sendLocation(msg.chat.id,chatbots[i].latitude, chatbots[i].longtitude);
                    }
                    else if(chatbots[i].type=="list"){
                        console.log("리스트  타입 통과");
                        bot.sendMessage(msg.chat.id, chatbots[i].question, {
                            "reply_markup": {
                                "keyboard": [[chatbots[i].elem1, chatbots[i].elem2],   [chatbots[i].elem3, chatbots[i].elem4], [chatbots[i].elem5, chatbots[i].elem6]]
                            }
                            });
                        
                    }
                }
            })
    })
    .catch((err)=>{
        bot.sendMessage(msg.chat.id, "키워드를 찾지 못했습니다.");
        console.error(err);
    });  
});


// 챗봇 추가 기능 +++ 
//    bot.forwardMessage(msg.chat.id,  "d");
//    bot.sendAudio(msg.chat.id,'1.mp3');
//    bot.sendDocument(msg.chat.id,'test.docx');
//    bot.sendVideo(msg.chat.id,'1.mp4');
//    bot.sendSticker(msg.chat.id,'test.docx'); // 카카오 이모티콘 같은건가봄 ㅇㅇ
//    bot.sendPhoto(chatId, photo, [options], [fileOptions]) ⇒ Promise
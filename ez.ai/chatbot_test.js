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
const TelegramBot = require('node-telegram-bot-api'); 


//첫번 째 토큰
const token = 'input token';
const bot = new TelegramBot(token, {polling: true});

// const getOneUser = async() => {
//     const id = 1;
//     const chatbot_test = await Chatbot.findOne({
//         // attributes: [
//         //     keyword,
//         //     type,
//         //     entity,
//         //     content,
//         //     ],
//         where: {
//             id:1
//         }
//     })
//     .then((chatbot)=>{
        
//     });
// }

//indexOf 문자열 내에서 특정한 문자열의 index 값을 리턴한다.
bot.on('message', (msg) => {
    console.log(msg);
    Chatbot.findAll({
       // where:{id:1}
    })
    .then((chatbot)=>{
        console.log("통과");
        console.log(chatbot);
        for(var i = 0;i<chatbot.length;i++){
        if(chatbot[i].type=="text"){
            console.log("타입 통과");
            console.log(chatbot[i].entity);
            if (msg.text.toString().toLowerCase().includes(chatbot[i].entity)) {
                console.log("엔티티 통과");    
            bot.sendMessage(msg.chat.id, chatbot[i].content);
            }
        }
        }
    })
});


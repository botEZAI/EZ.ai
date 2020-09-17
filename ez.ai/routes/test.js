const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport"); // passport 패키지 설치
const port = process.env.PORT || 5000; //5000포트 사용 react는 3000포트 proxy로 연결중
const flash = require("connect-flash"); //일회용 메세지를 출력하는 미들웨어
const session = require("express-session"); //세선관리용 미들웨어
const AWS = require("aws-sdk"); //asw sdk
require("dotenv").config();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
  region: "ap-northeast-2",
});
//라인봇 관련
const line = require('@line/bot-sdk');//라인봇
const middleware = require('@line/bot-sdk').middleware
const JSONParseError = require('@line/bot-sdk').JSONParseError
const SignatureValidationFailed = require('@line/bot-sdk').SignatureValidationFailed
const Client = require('@line/bot-sdk').Client;

//line DB
const ChatbotData = require('./models').ChatbotData;
const User = require('./models').User;
//라인
//token
const config = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN,
    channelSecret: process.env.LINE_SECRET_CODE,
};
const client = new line.Client(config);


const cookieParser = require("cookie-parser");
const sequelize = require("./models").sequelize;
const passportConfig = require("./passport"); // passport 모듈 연결

const app = express();
sequelize.sync();
passportConfig(passport); //passport
//라우터 연결
//라인
////
app.post('/webhook', line.middleware(config), (req, res) => {
  console.log("라인통과");
     if (req.body.destination) {
      console.log("Destination User ID: " + req.body.destination);
     }
    // req.body.events should be an array of events
    if (!Array.isArray(req.body.events)) {
      return res.status(500).end();
    }
    // handle events separately
    Promise.all(req.body.events.map(handleEvent))
      .then(() => res.end())
      .catch((err) => {
        console.error(err);
        res.status(500).end();
    });
});


// callback function to handle a single event
function handleEvent(event) {
    switch (event.type) {
     case 'message':
       const message = event.message;
         if(message.type==='text')
           return handleText(message, event.replyToken, event.source);
    }
}

function logic(array,text){   //키워드 찾는 함수
    let contents= [];
    let flag = 0;
    array.forEach(element => {
        if(element.keyword===text) {
            console.log("키워드 찾음", element.keyword);
            contents = element.contents;
            flag=1;
        }
    });
        if(flag==1) return contents;
        else return 0;
}
function template_action(actions, msgObjects){
   console.log(actions);
   let flag = 0;
   const len = msgObjects.length-1; //어짜피 템플릿들은 마지막에 위치함
   for(let i=0;i<actions.length;i++){
       if(actions[i].type === "uri"){
                console.log("uri 통과");
                if(flag==0){
                 msgObjects[len].template.actions= [{
                 type: "uri",
                 label: actions[i].label,
                 uri: actions[i].uri,
                 }]
            flag=1;
            }
            else{
               msgObjects[len].template.actions.push({
                 type: "uri",
                 label: actions[i].label,
                 uri: actions[i].uri,
                });
            }

      }
      else if(actions[i].type === "postback"){
             if(flag==0){
                 msgObjects[len].template.actions=[{
                 type: "postback",
                 label: actions[i].label,
                 data: "action=buy&itemid=111",
                text: actions[i].data,
                 }]
                flag=1;
              }
            else{
                msgObjects[len].template.actions.push({
                        type: "postback",
                        label: actions[i].label,
                        data: "action=buy&itemid=111",
                        text: actions[i].data,
                });


                }

        }
        }


  console.log(msgObjects[len].template);
}


async function handleText(message, replyToken, source) {
    const data = await ChatbotData.findAll({
     attributes:['data'],
    });
    const data1 = await JSON.parse(data[1].data);
    const contents = await logic(data1,message.text);
    if(contents){
     const msg_array =[];
     contents.forEach(element=> {
        const type_val = element.type;
        const text_val = element.content;
        //위치 정보
        const title_val = element.title;
        const latitude_val = Number(element.latitude);  //정확한 위도 정보가 아니면 error
        const longitude_val = Number(element.longtitude); //정확한 경도 정보가 아니면 error
        //이미지 정보
        const url_val = element.filepath;
        if(type_val==='text'){
           console.log("텍스트 타입 통과");
           msg_array.push({type: type_val, text: text_val});
           console.log(msg_array);
        }
        else if(element.type==='location'){
            console.log("위치 타입 통과");
            console.log(element);
            msg_array.push({type: type_val, title: title_val, address: "adress", latitude: latitude_val, longitude: longitude_val});
        }
       else if(type_val==='image'){
        console.log("이미지 타입 통과");
       // console.log(element);
        msg_array.push({type: "image", originalContentUrl: url_val, previewImageUrl: url_val });
        //originalContentUrl =>필수 정보
        //previewImageUrl => 필수 정보
       }
       else if(type_val==='video'){
        console.log("비디오 타입 통과");
        console.log(element);
        const v_url = element.content;
        msg_array.push({type: "video", originalContentUrl: v_url, previewImageUrl: "https://ezai.s3.ap-northeast-2.amazonaws.com/white.png" });
        //originalContentUrl => 필수 정보
        //previewImageUrl => 필수 정보
       }
       else if(type_val==='audio'){
        console.log("오디오 타입 통과");
        console.log(element);
        msg_array.push({type: "audio", originalContentUrl:url_val, duration:element.size});
        //originalContentUrl => 필수 정보
        //duration => 필수 정보 => Length of audio file (milliseconds)
       }
       else if(type_val==='btn_template'){
        console.log("버튼 템플릿 타입 통과");
        msg_array.push({type: "template", altText: "button template",
              template:
              {
              type: "buttons",
              thumbnailImageUrl: element.content.thumbnailImageUrl,
              imageSize: element.content.imageSize,
              imageBackgroundColor: element.content.imageBackgroundColor,
              title: element.content.title, text: element.content.text
              }
         });
        template_action(element.content.actions, msg_array);
       }
});
    return client.replyMessage(replyToken, msg_array)
        .then(() => {
        console.log("출력통과");
        })
        .catch((err) => {
        console.log(err);
    });
 }
}



//
const chatbotDataRouter = require("./routes/chatbotData"); //챗봇 생성 라우터
const imageRouter = require("./routes/image"); //이미지 라우터
const videoRouter = require("./routes/video"); //비디오 라우터
const audioRouter = require("./routes/audio"); //오디오 라우터
const fileRouter = require("./routes/file"); //파일 라우터
const authRouter = require("./routes/auth"); //로그인 라우터
const objectRouter = require("./routes/object"); //오브젝트 관련 라우터
//const webhookRouter = require("./routes/webhook"); //웹훅 라우터
// 세션관리 + cookiparser 미들웨어
app.use(cookieParser("secret code"));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "secret code",
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "Ez.ai",
  })
);

//미들웨어 사용
app.use("/", express.static("objects"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash()); // flash 미들웨어
app.use(passport.initialize()); //passport 사용
app.use(passport.session()); //passport 사용

//라우터 사용
// app.use("/webhook", webhookRouter);
app.use("/api/chatbotdata", chatbotDataRouter); //챗봇 생성 라우터
app.use("/api/image", imageRouter); //이미지
app.use("/api/video", videoRouter); //비디오
app.use("/api/audio", audioRouter); //오디오
app.use("/api/file", fileRouter); //파일
app.use("/api/user", authRouter); //로그인
app.use("/object", objectRouter); //오브젝트

// 아직 에러 처리부분 없음
app.listen(port, () => console.log(`Listening on port ${port}`));

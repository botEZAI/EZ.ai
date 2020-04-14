const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport"); // passport 패키지 설치
const port = process.env.PORT || 5000; //5000포트 사용 react는 3000포트 proxy로 연결중
const flash = require("connect-flash"); //일회용 메세지를 출력하는 미들웨어
const session = require("express-session"); //세선관리용 미들웨어

const cookieParser = require("cookie-parser");
const sequelize = require("./models").sequelize;
const passportConfig = require("./passport"); // passport 모듈 연결

const app = express();
sequelize.sync();
passportConfig(passport); //passport

//라우터 연결

const chatbotRouter = require("./routes/chatbot"); // 키워드 + 콘텐트 라우터
const chatbotDataRouter = require("./routes/chatbotData"); //챗봇 생성 라우터
const imageRouter = require("./routes/image"); //이미지 라우터
const videoRouter = require("./routes/video"); //비디오 라우터
const audioRouter = require("./routes/audio"); //오디오 라우터
const fileRouter = require("./routes/file"); //파일 라우터
const authRouter = require("./routes/auth"); //로그인 라우터


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
app.use("/api/chatbotbuild", chatbotRouter); // 키워드 + 콘텐트
app.use("/api/chatbotdata", chatbotDataRouter); //챗봇 생성 라우터
app.use("/api/image", imageRouter); //이미지
app.use("/api/video", videoRouter); //비디오
app.use("/api/audio", audioRouter); //오디오
app.use("/api/file", fileRouter); //파일
app.use("/api/user", authRouter); //로그인

// 아직 에러 처리부분 없음
app.listen(port, () => console.log(`Listening on port ${port}`));

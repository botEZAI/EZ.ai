const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000; //5000포트 사용 react는 3000포트 proxy로 연결중
const cookieParser = require("cookie-parser");
const sequelize = require("./models").sequelize;

const app = express();
sequelize.sync();

//라우터 연결
const chatbotRouter = require("./routes/chatbot"); // 키워드 + 콘텐트 라우터
const imageRouter = require("./routes/image"); //이미지 라우터
const videoRouter = require("./routes/video"); //비디오 라우터
const audioRouter = require("./routes/audio"); //오디오 라우터
const fileRouter = require("./routes/file"); //파일 라우터

//수정,삭제 라우터 추가 
// var fileChatbotUpdata = require("./routes/chatbotUpdate")// 챗봇 내용 수정 라우터
// var fileRouterUpdate = require("./routes/fileUpdate"); //파일 수정 라우터
// var imageRouterUpdate = require("./routes/imageUpdate"); //이미지 라우터
// var videoRouterUpdate = require("./routes/videoUpdate"); //비디오 라우터
// var audioRouterUpdate = require("./routes/audioUpdate"); //오디오 라우터
// var fileRouterUpdate = require("./routes/fileUpdate"); //파일 라우터

//삭제 라우터 추가 
// var fileChatbotDel = require("./routes/chatbotDel")// 챗봇 내용 삭제 라우터
//var fileRouterDel = require("./routes/fileDel"); //파일 삭제 라우터
// var imageRouterDel = require("./routes/imageDel"); //이미지 삭제 라우터
// var videoRouterDel = require("./routes/videoDel"); //비디오 삭제 라우터
// var audioRouterDel = require("./routes/audioDel"); //오디오 삭제 라우터
// var fileRouterDel = require("./routes/fileDel"); //파일 삭제 라우터


//미들웨어 사용
app.use("/", express.static("objects"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//라우터 사용
app.use("/api/chatbotbuild", chatbotRouter); // 키워드 + 콘텐트
app.use("/api/image", imageRouter); //이미지
app.use("/api/video", videoRouter); //비디오
app.use("/api/audio", audioRouter); //오디오
app.use("/api/file", fileRouter); //파일

// 아직 에러 처리부분 없음
app.listen(port, () => console.log(`Listening on port ${port}`));

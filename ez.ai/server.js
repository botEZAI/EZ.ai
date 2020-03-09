var express = require("express");
var bodyParser = require("body-parser");
var port = process.env.PORT || 5000; //5000포트 사용 react는 3000포트 proxy로 연결중
var cookieParser = require('cookie-parser');
var sequelize = require('./models').sequelize;

var app = express();
sequelize.sync();

//라우터 연결
var chatbotRouter = require('./routes/chatbot'); // 키워드 + 콘텐트 라우터
var imageRouter = require('./routes/image');  //이미지 라우터
var videoRouter = require('./routes/video'); //비디오 라우터
var audioRouter = require('./routes/audio'); //오디오 라우터
var fileRouter = require('./routes/file'); //파일 라우터


//미들웨어 사용
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//라우터 사용
app.use('/api/chatbotbuild',chatbotRouter); // 키워드 + 콘텐트 
app.use('/api/image',imageRouter); //이미지 
app.use('/api/video',videoRouter); //비디오
app.use('/api/audio',audioRouter); //오디오
app.use('/api/file',fileRouter); //파일


// 아직 에러 처리부분 없음 
app.listen(port, () => console.log(`Listening on port ${port}`));

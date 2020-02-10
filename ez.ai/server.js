var express = require("express");
var bodyParser = require("body-parser");
var port = process.env.PORT || 5000;
var cookieParser = require('cookie-parser');
var sequelize = require('./models').sequelize;

var app = express();
sequelize.sync();

//라우터 연결
var chatbotRouter = require('./routes/chatbot');

//미들웨어 사용
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//라우터 사용

app.use('/api/chatbotbuild',chatbotRouter);


app.get("api/register", (req, res) => {
  res.send({ message: "Hello Express!" });
});

app.post("/api/register", function(req, res) {
  console.log("가나다라마");
  res.send("POST request to the homepage");
});

// app.post("/api/chatbotbuild", (req, res) => {
//   console.log("받아지는 것 확인");
//   const content= req.body.keywordObject[0].keyword;
//   console.log(content);
// });
app.listen(port, () => console.log(`Listening on port ${port}`));

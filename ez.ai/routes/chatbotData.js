var express = require("express");
var router = express.Router();
const ChatbotData = require("../models").ChatbotData;
const User = require("../models").User;
const { isLoggedIn } = require("./middlewares");

//챗봇 로딩
router.get("/", async (req, res, next) => {
  try {
    const chatbotData = await ChatbotData.findAll({
      where: { user_id: req.user.id }, //join 되어있는 chatbot 목록을 가져옴
    });
    res.json(chatbotData); //프론트에 데이터 전송
  } catch (e) {
    console.error(e);
    next(e);
  }
});

//챗봇 등록
router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const newChatbot = await ChatbotData.create({
      username: req.body.user, // 사용자 이름
      botname: req.body.botname, //봇 이름
      sns: req.body.sns, // 어떤 플랫폼인지
      desc: req.body.desc, // 챗봇 설명
      token: req.body.token, //토큰 삽입
      data: JSON.stringify(req.body.data), //나중에 삭제 해야함
      user_id: req.user.id, //유저 ID 외래 키, req.user.id 는 passport에 localStrategy에서 옴
      categories: JSON.stringify(req.body.categories),
      platformInfo: JSON.stringify(req.body.platformInfo),
    });
    res.json(newChatbot);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
//챗봇 업데이트
router.patch("/", isLoggedIn, async (req, res, next) => {
  try {
    await ChatbotData.update(
      {
        data: JSON.stringify(req.body.data),
        categories: JSON.stringify(req.body.categories),
      },
      {
        where: { id: req.body.id },
      }
    );
    const chatbotData = await ChatbotData.findAll({
      where: { user_id: req.user.id },
    });
    res.json(chatbotData);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
//챗봇 삭제
router.delete("/", isLoggedIn, async (req, res, next) => {
  try {
    await ChatbotData.destroy({ where: { id: req.body.id } });
    const chatbotData = await ChatbotData.findAll({
      where: { user_id: req.user.id },
    });
    res.json(chatbotData);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
module.exports = router;

var express = require("express");
var router = express.Router();
const ChatbotData = require("../models").ChatbotData;
const { isLoggedIn } = require("./middlewares");

//챗봇 로딩
router.get("/", async (req, res, next) => {
  try {
    console.log("데이터는", req);
    const chatbotData = await ChatbotData.findAll({
      where: { user: req.user.email },
    });
    res.json(chatbotData);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

//챗봇 등록
router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const newChatbot = await ChatbotData.create({
      user: req.body.user,
      botname: req.body.botname,
      sns: req.body.sns,
      desc: req.body.desc,
      token: req.body.token,
      data: JSON.stringify(req.body.data),
    });
    res.json(newChatbot);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
module.exports = router;

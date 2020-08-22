var express = require("express");
var router = express.Router();
const ChatbotData = require("../models").ChatbotData;
const History = require("../models").History;
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
      desc: req.body.desc, // 챗봇 설명
      data: JSON.stringify(req.body.data), //나중에 삭제 해야함
      user_id: req.user.id, //유저 ID 외래 키, req.user.id 는 passport에 localStrategy에서 옴
      categories: JSON.stringify(req.body.categories),
      platformInfo: JSON.stringify(req.body.platformInfo), //platform 정보, 토큰 값, 연동여부
      deployData: "",
    });
    const created = await ChatbotData.findOne({
      where: { botname: req.body.botname },
    });
    const history = [
      {
        createdAt: created.createdAt,
        data: JSON.stringify(req.body.data),
        categories: JSON.stringify(req.body.categories),
        deploy: false,
        info: "초기",
      },
    ];
    await History.create({
      chatbot_id: created.id,
      history: JSON.stringify(history),
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
    const updated = await ChatbotData.findOne({ where: { id: req.body.id } });
    const newHistory = {
      createdAt: updated.updatedAt,
      data: updated.data,
      categories: updated.categories,
      deploy: false,
      info: req.body.info,
    };

    const history = await History.findOne({
      where: { chatbot_id: req.body.id },
    });
    const mergedHistory = JSON.parse(history.history);
    mergedHistory.push(newHistory);

    await History.update(
      {
        history: JSON.stringify(mergedHistory),
      },
      { where: { chatbot_id: req.body.id } }
    );
    const historyData = await History.findOne({
      where: { chatbot_id: req.body.id },
    });
    const chatbotData = await ChatbotData.findAll({
      where: { user_id: req.user.id },
    });
    console.log("history==", historyData);
    const mergedData = { chatbotData, historyData: historyData.history };

    res.json(mergedData);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
//챗봇 이름 업데이트
router.patch("/name", isLoggedIn, async (req, res, next) => {
  try {
    await ChatbotData.update(
      {
        botname: req.body.rename,
      },
      { where: { id: req.body.id } }
    );
    const currentChatbot = await ChatbotData.findOne({
      where: { id: req.body.id },
    });
    res.json(currentChatbot);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
//챗봇 설명 업데이트
router.patch("/desc", isLoggedIn, async (req, res, next) => {
  try {
    await ChatbotData.update(
      {
        desc: req.body.redesc,
      },
      { where: { id: req.body.id } }
    );
    const currentChatbot = await ChatbotData.findOne({
      where: { id: req.body.id },
    });
    res.json(currentChatbot);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
//챗봇 연동(토큰 요청),연동 해제
router.patch("/connect", isLoggedIn, async (req, res, next) => {
  try {
    await ChatbotData.update(
      {
        platformInfo: JSON.stringify(req.body.platformInfo),
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
//챗봇 기록 로딩
router.post("/history", isLoggedIn, async (req, res, next) => {
  try {
    const history = await History.findOne({
      where: { chatbot_id: req.body.id },
    });
    res.json(history);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
//챗봇 기록 복구
router.post("/history/recover", isLoggedIn, async (req, res, next) => {
  try {
    const history = await History.findOne({
      where: { chatbot_id: req.body.currentChatbot.id },
    });
    const selectedHistory = JSON.parse(history.history).find(
      (v) => v.createdAt === req.body.history.createdAt
    );
    res.json(selectedHistory);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
//챗봇 기록 삭제
router.patch("/history/remove", isLoggedIn, async (req, res, next) => {
  try {
    const history = await History.findOne({
      where: { chatbot_id: req.body.currentChatbot.id },
    });
    const rawData = JSON.parse(history.history);
    const deleteIndex = rawData.findIndex(
      (v) => v.createdAt === req.body.history.createdAt
    );
    rawData.splice(deleteIndex, 1);
    await History.update(
      {
        history: JSON.stringify(rawData),
      },
      { where: { chatbot_id: req.body.currentChatbot.id } }
    );
    res.json(rawData);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

//챗봇 배포
router.post("/history/deploy", isLoggedIn, async (req, res, next) => {
  try {
    const history = await History.findOne({
      where: { chatbot_id: req.body.currentChatbot.id },
    });
    const selectedHistory = JSON.parse(history.history).find(
      (v) => v.createdAt === req.body.history.createdAt
    );
    const index = JSON.parse(history.history).findIndex(
      (i) => i.createdAt === req.body.history.createdAt
    );
    const dHistory = JSON.parse(history.history);
    const deployHistory = dHistory.map((v) => {
      const data = v;
      data.deploy = false;
      return data;
    });
    deployHistory[index].deploy = true;

    await History.update(
      {
        history: JSON.stringify(deployHistory),
      },
      {
        where: { chatbot_id: req.body.currentChatbot.id },
      }
    );
    await ChatbotData.update(
      {
        deployData: JSON.stringify(selectedHistory.data),
      },
      {
        where: { id: req.body.currentChatbot.id },
      }
    );
    res.json(JSON.parse(history.history));
  } catch (e) {
    console.error(e);
    next(e);
  }
});
module.exports = router;

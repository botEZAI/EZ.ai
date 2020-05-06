//회원가입, 로그인, 로그아웃 라우터

const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { User } = require("../models");

const router = express.Router();

//유저 로딩
router.get("/", isLoggedIn, (req, res) => {
  const user = Object.assign({}, req.user.toJSON());
  delete user.password;
  delete user.createdAt;
  delete user.deletedAt;
  delete user.updatedAt;
  return res.json(user);
});
router.post("/", isNotLoggedIn, async (req, res, next) => {
  //회원가입
  const { email, password, userName, nickName, birthday } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      req.flash("joinError", "이미 가입된 메일입니다");
      console.log("이미 가입된 메일입니다.");
      return res.status(403).send("이미 사용중인 이메일입니다.");
    }
    const hash = await bcrypt.hash(password, 12);
    console.log(hash);
    await User.create({
      email: email,
      password: hash,
      nick: nickName,
      name: userName,
      birth: birthday,
    });
    return res.json("회원 가입 성공");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/login", (req, res, next) => {
  //로그인
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginError) => {
      try {
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }
        const fullUser = await User.findOne({
          where: { email: user.email },
          attributes: ["id", "email", "nick", "name", "birth"],
        });
        console.log("fullUser:", fullUser);
        return res.json(fullUser);
      } catch (e) {
        next(e);
      }
    });
  })(req, res, next);
});

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("logout 성공");
});

module.exports = router;

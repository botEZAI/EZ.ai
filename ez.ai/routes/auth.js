//회원가입, 로그인, 로그아웃 라우터

const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn }  = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

router.post('/', isNotLoggedIn, async(req, res, next) => { //회원가입
    const { email, password, userName, nickName, birthday } = req.body;
    try{
        const exUser = await User.findOne({ where : { email }});
        if (exUser){
            req.flash('joinError', '이미 가입된 메일입니다');
            console.log("이미 가입된 메일입니다.");
            return res.json('회원 가입 실패');
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
        return res.json('회원 가입 성공');
    } catch (error){
        console.error(error);
        return next(error);
    }   
});

router.post('/login', isNotLoggedIn, (req, res,next) => { //로그인
    console.log(req.body);
    passport.authenticate('local', (authError, user, info)=>{
        if (authError){
            console.error(authError);
            return next(authError);
        }
        if (!user){
            req.flash('loginError', info.message);
            return res.redirect('/');    
        }
        return req.login(user, (loginError) =>{
            if (loginError){
            console.error(loginError);
            return next(loginError);
        }
        return res.redirect('/');
        });
    })(req, res, next);
});

router.get('/logout', isLoggedIn, (req,res) =>{ //로그아웃
    req.logout();
    req.session.destory();
    res.redirect('/');
});

module.exports = router;
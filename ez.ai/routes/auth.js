//회원가입, 로그인, 로그아웃 라우터

const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const {isLoggedIn, isNotLoggedIn }  = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

router.post('/join', isNotLoggedIn, async(req, res, next) => { //회원가입
    const { email, nick, passowrd } = req.body;
    try{
        const exUser = await User.find({ where : { email }});
        if (exUser){
            req.flash('joinError', '이미 가입된 메일입니다');
            return res.redirect('/join');
        }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
        email,
        nick,
        passowrd: hash,
    });
        return res.redirect('/');
    } catch (error){
        console.error(error);
        return next(error);
    }   
});
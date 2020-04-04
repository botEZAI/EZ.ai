const local = require('./localStrategy');
const { User } = require('../models');


module.exports = (passport) =>{
    passport.serializeUser((user, done) =>{  //사용자 정보 객체를 세션에 아이디로 저장 
      done(null, user.id);  
    });

    passport.deserializeUser((id, done) =>{ // 저장한 아이디를 통해 사용자 정보 객체를 불러옴
        User.find({where : {id } })
            .then(user => done(null,user))
            .catch(err=> done(err));
    });

    local(passport);
};
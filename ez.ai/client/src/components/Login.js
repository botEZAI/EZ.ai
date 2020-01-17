import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";



const Login = () => {
  return (
      <article className = "article__login">
        <div className = "login-area">
            <div className = "logo">
                <div className = "logo__image"></div>
                <p><span>Ez.ai</span>에 오신 것을 환영합니다!</p>
            </div>

            <div className = "external_login">
                <div className="google">구글 로그인</div>
                <div className="naver">네이버 로그인</div>
            </div>

            <div class = "login-input">
              <form className="login-form">
                <input placeholder="이메일" /><br />
                <input placeholder="비밀번호" />
                <div className="login-extra">
                    <div className = "login-keep">
                        <input type = "checkbox" />
                        <span>로그인 유지</span>
                    </div>
                    <div className= "login-find">
                        <span>아이디찾기</span>
                        <span>비밀번호찾기</span>
                    </div>
                </div>
                  <div className = "login-btn">
                      <button className="login-btn__login">로그인</button>
                      <Link to="/register">
                          <button className="login-btn__register">회원가입</button>
                      </Link>
                  </div>
              </form>
            </div>
        </div>
      </article>
  );
};

export default Login;

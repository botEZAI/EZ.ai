import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div id = "login">
      <h1>Ez.ai</h1>
      <p>Ez.ai에 오신 것을 환영합니다!</p>
      <div>구글 로그인</div>
      <div>네이버 로그인</div>
      <form className="login-form">
        <input placeholder="이메일" /><br />
        <input placeholder="비밀번호" />
        <div>로그인 유지 아이디찾기 비밀번호찾기</div>
        <button>로그인</button>
        <Link to="/register">
          <button>회원가입</button>
        </Link>
      </form>
    </div>
  );
};

export default Login;

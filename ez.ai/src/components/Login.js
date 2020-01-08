import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <form className="login-form">
        <input placeholder="이메일" />
        <input placeholder="비밀번호" />
        <button>로그인</button>
        <Link to="/register">
          <button>회원가입</button>
        </Link>
      </form>
    </>
  );
};

export default Login;

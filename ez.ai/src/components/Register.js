import React from "react";
import "./Register.css";
const Register = () => {
  return (
    <>
      <form className="register-form">
        <input placeholder="이메일" />
        <input placeholder="비밀번호" />
        <input placeholder="비밀번호 확인" />
        <span>개인정보</span>
        <input placeholder="이름" />
        <input placeholder="닉네임" />
        <input placeholder="생년월일" />
        <button>다음</button>
      </form>
    </>
  );
};

export default Register;

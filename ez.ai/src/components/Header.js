import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="Header">
      <Link to="/">
        <div>홈(로고)</div>
      </Link>
      <Link to="/about">
        <div>소개</div>
      </Link>
      <Link to="/guide">
        <div>가이드라인</div>
      </Link>
      <Link to="/faq">
        <div>FAQ</div>
      </Link>
      <div></div>
      <div></div>
      <Link to="/login">
        <div>로그인</div>
      </Link>
    </div>
  );
};

export default Header;

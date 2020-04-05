import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="header">
      <div className="nav">
        <ul>
          <li className="logo_default">
            <Link to="/">Ez.ai</Link>
          </li>
          <li>
            <Link to="/about">소개</Link>
          </li>
          <li>
            <Link to="/guide">가이드라인</Link>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
          <li>
            <Link to="/chatbotlist">
              <div>챗봇목록</div>
            </Link>
          </li>
          <li>
            <Link to="/chatbotbuild">
              <div>챗봇만들기</div>
            </Link>
          </li>
        </ul>
      </div>

      {/*

        */}
      <div className="login">
        {user ? (
          <Link to="/profile">프로필</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </div>
    </div>
  );
};

export default Header;

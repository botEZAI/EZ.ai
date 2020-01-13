import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="Header">
        <div className = "nav">
            <ul>
                <li className = "logo_default">
                    <Link to="/">Ez.ai
                    </Link>
                </li>
                <li>
                    <Link to="/about">
                        소개
                    </Link>
                </li>
                <li>
                    <Link to="/guide">
                        가이드라인
                    </Link>
                </li>
                <li>
                    <Link to="/faq">
                        FAQ
                    </Link>
                </li>
                <li>
                    <Link to="/chatbotlist">
                        <div>챗봇목록</div>
                    </Link>
                </li>
            </ul>
        </div>

        {/*

        */}
        <div className = "login">
          <Link to="/login">
            로그인
          </Link>
        </div>
        </div>

  );
};

export default Header;

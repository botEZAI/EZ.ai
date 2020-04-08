import React, { useEffect, useCallback } from "react";
import { Link, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LOAD_USER_REQUEST, LOG_OUT_REQUEST } from "../reducer/user";

const Header = ({ history }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch({
        type: LOAD_USER_REQUEST,
      });
    }
  }, [user]);
  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);

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
      {/*로그아웃 버튼 css필요*/}
      {user && <button onClick={onLogout}>로그아웃</button>}
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

export default withRouter(Header);

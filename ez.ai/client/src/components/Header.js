import React, { useEffect, useCallback, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LOAD_USER_REQUEST } from "../reducer/user";
import NavPopup from "../NavPopup";

const Header = ({ history }) => {
  const { user } = useSelector((state) => state.user);
  const { currentChatbot } = useSelector((state) => state.chatbot);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch({
        type: LOAD_USER_REQUEST,
      });
    }
  }, [user]);

  const [showNP, setShowNP] = useState(false);

  // const createChatbot = () => {
  //   if (!user) {
  //     alert("먼저 로그인해주시기 바랍니다.");
  //   }
  // };

  const clickNavPopup = () => {
    setShowNP(!showNP);
  };

  return (
    <div className="header">
      <div className="nav_l">
        <div className="logo_default">
          <div>
            <Link to="/">
              <div className="logo-img"></div>
              <div className="logo-text">
                <p>Ez.ai</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="nav">
          {/* <ul>
            <li>
              <Link to="/about">소개</Link>
            </li>
            <li>
              <Link to="/guide">가이드라인</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
          </ul> */}
        </div>
      </div>
      <div className="nav_r">
        {!user ? (
          <div className="nav_right">
            <div className="nav_login">
              <Link to="/login">로그인</Link>
            </div>
            <div className="nav_register">
              <Link to="/register">회원가입</Link>
            </div>
          </div>
        ) : (
          <>
            <div className="nav_right profile" onClick={clickNavPopup}>
              <div className="profile-picture">
                <i className="fas fa-user-circle"></i>
              </div>
              <div className="profile-more">
                {user.nick} 님&nbsp;
                {!showNP ? (
                  <i className="fas fa-chevron-down"></i>
                ) : (
                  <i className="fas fa-chevron-up"></i>
                )}
              </div>
            </div>
          </>
        )}
        <div className="nav_chatbot">
          <div className="nav_chatbot-btn">
            {!user ? (
              <Link to="/login">챗봇만들기</Link>
            ) : (
              <Link to="/chatbotlist">챗봇만들기</Link>
            )}
          </div>
        </div>
      </div>

      {showNP ? <NavPopup showNP={showNP} setShowNP={setShowNP} /> : null}
    </div>
  );
};

export default withRouter(Header);

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
  const clickNavPopup = () => {
    setShowNP(!showNP);
  };

  return (
    <div className="header">
      <div className="logo_default">
        <div>
          <Link to="/">Ez.ai</Link>
        </div>
      </div>
      <div className="nav">
        <ul>
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

      {!user ? (
        <div className="nav_right login">
          <Link to="/login">로그인</Link>
        </div>
      ) : (
        <div className="nav_right profile" onClick={clickNavPopup}>
          <div className="profile-picture">
            <i className="fas fa-user-circle"></i>
          </div>
          <div className="profile-more">{user.name}님</div>
        </div>
      )}
      {showNP ? <NavPopup showNP={showNP} setShowNP={setShowNP} /> : null}
    </div>
  );
};

export default withRouter(Header);
